import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getMessage, shareText } from "@/lib/messages";

const message = getMessage("caminhe-com-fe");
if (!message) throw new Error("Missing fixture");
const m = message;

describe("Image sharing", () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
    vi.stubGlobal("Image", class {
      width = 1080;
      height = 1350;
      onload?: () => void;
      set src(_value: string) { queueMicrotask(() => this.onload?.()); }
    });
    const context = {
      drawImage: vi.fn(), createLinearGradient: () => ({ addColorStop: vi.fn() }),
      fillRect: vi.fn(), fillText: vi.fn(), measureText: () => ({ width: 100 }),
    };
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation((cb) => cb(new Blob(["jpeg-image"], { type: "image/jpeg" })));
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: vi.fn(() => "blob:download") });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
    vi.spyOn(window, "open").mockReturnValue(null);
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "canShare", { configurable: true, value: undefined });
  });
  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

  it("sends a JPEG attachment and caption through native sharing", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { configurable: true, value: share });
    Object.defineProperty(navigator, "canShare", { configurable: true, value: () => true });
    const { prepareShareImage, shareToWhatsApp } = await import("@/lib/share");
    await prepareShareImage(m);
    await shareToWhatsApp(m);
    const payload = share.mock.calls[0]?.[0] as ShareData | undefined;
    expect(payload?.files?.[0]?.name).toBe("caminhe-com-fe.jpg");
    expect(payload?.files?.[0]?.type).toBe("image/jpeg");
    expect(payload?.files?.[0]?.size).toBeGreaterThan(0);
    expect(payload?.text).toBe(shareText(m));
    expect(window.open).not.toHaveBeenCalled();
  });

  it("downloads the image separately when attachments are unsupported, without leaving the app", async () => {
    const original = window.location.href;
    const { shareToWhatsApp } = await import("@/lib/share");
    await shareToWhatsApp(m);
    expect(window.open).toHaveBeenCalledWith(`https://wa.me/?text=${encodeURIComponent(shareText(m))}`, "_blank", "noopener");
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledOnce();
    expect(window.location.href).toBe(original);
  });

  it("does not open WhatsApp or download after native sharing is cancelled", async () => {
    Object.defineProperty(navigator, "share", { configurable: true, value: vi.fn().mockRejectedValue(new DOMException("Cancelled", "AbortError")) });
    Object.defineProperty(navigator, "canShare", { configurable: true, value: () => true });
    const { prepareShareImage, shareToWhatsApp } = await import("@/lib/share");
    await prepareShareImage(m);
    await shareToWhatsApp(m);
    expect(window.open).not.toHaveBeenCalled();
    expect(HTMLAnchorElement.prototype.click).not.toHaveBeenCalled();
  });
});