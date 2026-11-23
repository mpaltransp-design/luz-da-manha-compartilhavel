import { describe, expect, it } from "vitest";
import { categories, messages } from "@/lib/messages";
import { hasOwnPrayer } from "@/lib/prayers";

describe("catálogo ampliado", () => {
  for (const c of categories) {
    it(`${c.label} tem no mínimo 24 mensagens, todas com oração própria`, () => {
      const list = messages.filter((m) => m.category === c.id);
      expect(list.length).toBeGreaterThanOrEqual(24);
      for (const m of list) expect(hasOwnPrayer(m.id)).toBe(true);
    });
  }
});
