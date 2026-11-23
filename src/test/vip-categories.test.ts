import { describe, expect, it } from "vitest";
import { categories, messages } from "@/lib/messages";
import { hasOwnPrayer } from "@/lib/prayers";

const vipNew = ["cura", "protecao", "amizade", "semana", "trabalho"] as const;

describe("categorias VIP", () => {
  for (const id of vipNew) {
    it(`${id} é VIP com no mínimo 4 mensagens e oração própria`, () => {
      expect(categories.find((c) => c.id === id)?.vip).toBe(true);
      const list = messages.filter((m) => m.category === id);
      expect(list.length).toBeGreaterThanOrEqual(4);
      for (const m of list) expect(hasOwnPrayer(m.id)).toBe(true);
    });
  }
});
