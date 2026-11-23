import { toast } from "sonner";
import prayer from "@/assets/oracao-da-manha.mp3.asset.json";
import { photoOf, shareText, type Message } from "./messages";
import { recordShare } from "./store";
import { artworkGreeting } from "./artwork";

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
  const colors = getComputedStyle(document.documentElement);
  const cream = colors.getPropertyValue("--cream").trim();
  const ink = colors.getPropertyValue("--ink").trim();
  const muted = colors.getPropertyValue("--ink-muted").trim();
  const gold = colors.getPropertyValue("--gold").trim();
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const scale = Math.max(W / img.width, H / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

  const g = ctx.createLinearGradient(0, 0, 0, H * 0.9);
  g.addColorStop(0, cream);
  g.addColorStop(0.65, cream);
  g.addColorStop(1, "transparent");
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  const greeting = artworkGreeting(m);
  if (greeting) {
    ctx.fillStyle = gold;
    ctx.font = '600 76px Lora, Georgia, serif';
    ctx.fillText(greeting, W / 2, 155);
  }
  ctx.fillStyle = ink;
  const size = m.verse.length > 110 ? 54 : m.verse.length > 70 ? 62 : 70;
  ctx.font = `600 ${size}px Lora, Georgia, serif`;
  const lines = wrap(ctx, `“${m.verse}”`, W - 180);
  let y = greeting ? 270 : 200;
  for (const l of lines) {
    ctx.fillText(l, W / 2, y);
    y += size * 1.3;
  }
  ctx.font = "italic 500 40px Lora, Georgia, serif";
  ctx.fillStyle = muted;
  ctx.fillText(m.reference, W / 2, y + 30);

  ctx.font = "700 30px 'Nunito Sans', sans-serif";
  ctx.fillStyle = cream;
  ctx.fillText("☀ Mensagens do Dia", W / 2, H - 60);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/jpeg", 0.9));
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

const readyFiles = new Map<string, File>();
const pendingFiles = new Map<string, Promise<File>>();

/** Prepares before the click so native sharing retains the browser's user gesture. */
export function prepareShareImage(m: Message): Promise<File> {
  const ready = readyFiles.get(m.id);
  if (ready) return Promise.resolve(ready);
  const pending = pendingFiles.get(m.id);
  if (pending) return pending;
  const task = renderShareImage(m).then((blob) => {
    if (!blob) throw new Error("Não foi possível gerar a imagem");
    const file = new File([blob], `${m.id}.jpg`, { type: "image/jpeg" });
    if (readyFiles.size >= 8) {
      const oldest = readyFiles.keys().next().value;
      if (oldest) readyFiles.delete(oldest);
    }
    readyFiles.set(m.id, file);
    return file;
  }).finally(() => pendingFiles.delete(m.id));
  pendingFiles.set(m.id, task);
  return task;
}

export async function downloadShareImage(m: Message): Promise<boolean> {
  try {
    const file = await prepareShareImage(m);
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return true;
  } catch {
    toast.error("Não foi possível baixar a imagem. Tente novamente.");
    return false;
  }
}

export async function shareToWhatsApp(m: Message): Promise<void> {
  const text = shareText(m);
  const file = readyFiles.get(m.id);
  if (file && navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text });
      recordShare(m.id);
      return;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      toast.error("Não foi possível compartilhar. Use Baixar imagem e anexe no WhatsApp.");
      return;
    }
  }
  // A WhatsApp URL only carries text, never an attachment. Keep the working link;
  // download the artwork separately and never navigate the preview iframe away.
  window.open(whatsappUrl(text), "_blank", "noopener");
  if (await downloadShareImage(m)) {
    toast.success("Imagem baixada!", {
      description: "Anexe a imagem na conversa do WhatsApp. Se o WhatsApp estiver bloqueado aqui, teste no site publicado.",
      duration: 9000,
    });
  }
}

// Prayer audio ---------------------------------------------------------------
let prayerFile: File | null = null;
let prayerPending: Promise<File> | null = null;

/** Fetches and caches the prayer audio before the click, keeping the user gesture. */
export function preparePrayerAudio(): Promise<File> {
  if (prayerFile) return Promise.resolve(prayerFile);
  if (prayerPending) return prayerPending;
  const task = fetch(prayer.url)
    .then((r) => {
      if (!r.ok) throw new Error("Falha ao carregar o áudio");
      return r.blob();
    })
    .then((b) => {
      prayerFile = new File([b], "oracao-da-manha.mp3", { type: "audio/mpeg" });
      return prayerFile;
    })
    .finally(() => {
      prayerPending = null;
    });
  prayerPending = task;
  return task;
}

export async function downloadPrayerAudio(): Promise<boolean> {
  try {
    const file = await preparePrayerAudio();
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return true;
  } catch {
    toast.error("Não foi possível baixar a oração. Tente novamente.");
    return false;
  }
}

/** VIP perk: sends the 1-minute prayer as an audio attachment, or downloads it to attach manually. */
export async function sharePrayerAudio(): Promise<void> {
  const file = prayerFile;
  const text = "🙏 Oração da Manhã · 1 minuto — Mensagens do Dia";
  if (file && navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text });
      return;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      toast.error("Não foi possível compartilhar. Baixe o áudio e anexe no WhatsApp.");
      return;
    }
  }
  // WhatsApp links can't carry audio; download it so the user can attach it.
  if (await downloadPrayerAudio()) {
    toast.success("Oração baixada!", {
      description: "Anexe o áudio na conversa do WhatsApp e envie para abençoar alguém 🙏",
      duration: 9000,
    });
  }
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
