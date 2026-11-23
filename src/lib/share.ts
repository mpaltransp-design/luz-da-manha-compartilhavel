import { toast } from "sonner";
import { photoOf, shareText, type Message } from "./messages";
import { recordShare } from "./store";

const W = 1080;
const H = 1350;

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > max && line) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Draws the photo with the verse on a soft cream scrim, 4:5, ready for WhatsApp. */
export async function renderShareImage(m: Message): Promise<Blob | null> {
  try {
    await Promise.all([
      document.fonts.load('600 64px "Lora"'),
      document.fonts.load('italic 500 40px "Lora"'),
    ]);
  } catch {
    /* fall back to system serif */
  }
  const img = await loadImage(photoOf(m));
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const scale = Math.max(W / img.width, H / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

  const g = ctx.createLinearGradient(0, 0, 0, H * 0.72);
  g.addColorStop(0, "rgba(253,247,239,0.94)");
  g.addColorStop(0.6, "rgba(253,247,239,0.72)");
  g.addColorStop(1, "rgba(253,247,239,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.fillStyle = "#3b2a22";
  const size = m.verse.length > 110 ? 54 : m.verse.length > 70 ? 62 : 70;
  ctx.font = `600 ${size}px Lora, Georgia, serif`;
  const lines = wrap(ctx, `“${m.verse}”`, W - 180);
  let y = 200;
  for (const l of lines) {
    ctx.fillText(l, W / 2, y);
    y += size * 1.3;
  }
  ctx.font = "italic 500 40px Lora, Georgia, serif";
  ctx.fillStyle = "#7a6457";
  ctx.fillText(m.reference, W / 2, y + 30);

  ctx.font = "700 30px 'Nunito Sans', sans-serif";
  ctx.fillStyle = "rgba(253,247,239,0.95)";
  ctx.fillText("☀ Mensagens do Dia", W / 2, H - 60);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/jpeg", 0.9));
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Shares the message to WhatsApp. On phones it uses the system share sheet with the
 * picture and the text; elsewhere it opens WhatsApp with the text ready to send.
 */
export async function shareToWhatsApp(m: Message): Promise<void> {
  const text = shareText(m);
  const nav = typeof navigator !== "undefined" ? navigator : undefined;
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  if (nav?.share && isTouch) {
    try {
      const blob = await renderShareImage(m);
      if (blob) {
        const file = new File([blob], `${m.id}.jpg`, { type: "image/jpeg" });
        if (nav.canShare?.({ files: [file] })) {
          await nav.share({ files: [file], text });
          recordShare(m.id);
          return;
        }
      }
      await nav.share({ text });
      recordShare(m.id);
      return;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      /* fall through to the WhatsApp link */
    }
  }

  const win = window.open(whatsappUrl(text), "_blank", "noopener");
  if (!win) window.location.href = whatsappUrl(text);
  recordShare(m.id);
}

export async function copyCaption(m: Message): Promise<void> {
  const text = shareText(m);
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast.success("Mensagem copiada!", { description: "Agora é só colar no WhatsApp 💚" });
}
