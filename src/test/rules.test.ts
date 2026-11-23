import { describe, expect, it, beforeEach } from "vitest";
import { getFavorites, toggleFavorite } from "@/lib/store";
import { filterMessages, getMessage, isLocked, messages, shareText } from "@/lib/messages";
import { whatsappUrl } from "@/lib/share";

describe("Mensagens do Dia rules", () => {
  beforeEach(() => window.localStorage.clear());

  it("ships at least 30 messages", () => {
    expect(messages.length).toBeGreaterThanOrEqual(30);
  });

  it("locks Conforto & Luto and Aniversário for free users only", () => {
    const luto = messages.find((m) => m.category === "conforto")!;
    const bday = messages.find((m) => m.category === "aniversario")!;
    const free = messages.find((m) => m.category === "bom-dia")!;
    expect(isLocked(luto, false)).toBe(true);
    expect(isLocked(bday, false)).toBe(true);
    expect(isLocked(free, false)).toBe(false);
    expect(isLocked(luto, true)).toBe(false);
  });

  it("category chip shows only that category", () => {
    expect(filterMessages("paz").every((m) => m.category === "paz")).toBe(true);
  });

  it("favorites save and remove", () => {
    expect(toggleFavorite("caminhe-com-fe")).toBe(true);
    expect(getFavorites()).toContain("caminhe-com-fe");
    expect(toggleFavorite("caminhe-com-fe")).toBe(false);
    expect(getFavorites()).not.toContain("caminhe-com-fe");
  });

  it("WhatsApp link carries the encoded caption and verse", () => {
    const m = getMessage("entrega-o-teu-caminho")!;
    const url = whatsappUrl(shareText(m));
    expect(url.startsWith("https://wa.me/?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toContain("Salmos 37:5");
  });
});
