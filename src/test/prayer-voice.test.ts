import { describe, expect, it } from "vitest";
import manifest from "@/lib/prayer-recordings.json";
import general from "@/assets/oracao-da-manha.mp3.asset.json";
import { messages } from "@/lib/messages";
import { hasOwnPrayer, prayerFor } from "@/lib/prayers";

type Pointer = { url: string; original_filename: string; content_type: string; size: number };
const pointers = import.meta.glob<Pointer>("@/assets/oracoes/*.mp3.asset.json", { eager: true, import: "default" });

describe("approved V3 prayer voice", () => {
  it("keeps shimmer at the approved natural speed for current and future recordings", () => {
    expect(manifest.version).toBe("v3");
    expect(manifest.synthesis.model).toBe("openai/gpt-4o-mini-tts");
    expect(manifest.synthesis.voice).toBe("shimmer");
    expect(manifest.synthesis.speed).toBe(1.0);
  });

  it("has one distinct recording for every message and the general prayer", () => {
    const keys = manifest.recordings.map((r) => r.key);
    expect(new Set(keys).size).toBe(messages.length + 1);
    expect([...keys].sort()).toEqual([...messages.map((m) => m.id), "geral"].sort());
    expect(new Set(manifest.recordings.map((r) => r.text)).size).toBe(keys.length);
    for (const message of messages) {
      expect(hasOwnPrayer(message.id)).toBe(true);
      expect(manifest.recordings.find((r) => r.key === message.id)?.text).toContain(message.verse);
    }
  });

  it("serves only V3 MP3s with separate files for every prayer, including fallback", () => {
    const assets = [...Object.values(pointers), general];
    expect(assets.length).toBe(messages.length + 1);
    expect(new Set(assets.map((p) => p.url)).size).toBe(assets.length);
    for (const asset of assets) {
      expect(asset.original_filename.endsWith("-v3-musica.mp3")).toBe(true);
      expect(asset.content_type).toBe("audio/mpeg");
      expect(asset.size).toBeGreaterThan(10_000);
    }
    expect(prayerFor("unknown-message").url).toBe(general.url);
    for (const message of messages) {
      expect(prayerFor(message.id).url).toContain(`oracao-${message.id}-v3.mp3`);
    }
  });
});
import manifestWithMusic from "@/lib/prayer-recordings.json";
import { describe as d2, expect as e2, it as i2 } from "vitest";
d2("background music", () => {
  i2("every prayer uses the shared background music mix", () => {
    const m = (manifestWithMusic as { music?: { asset: string; volume: number } }).music;
    e2(m?.asset).toBe("src/assets/fundo-musical-oracoes.mp3.asset.json");
    e2(m!.volume).toBeLessThan(0.3);
  });
});
