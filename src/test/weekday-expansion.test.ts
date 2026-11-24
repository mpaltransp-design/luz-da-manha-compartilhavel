import { describe, expect, it } from "vitest";
import { messages, photoOf, isLocked } from "@/lib/messages";
import { hasOwnPrayer, prayerFor } from "@/lib/prayers";
import manifest from "@/lib/prayer-recordings.json";

const ids = [
  "semana-segunda-passos-ensinados", "semana-segunda-guiada-na-verdade",
  "semana-terca-passos-firmados", "semana-terca-ouvindo-o-cuidado",
  "semana-quarta-coracao-inteiro", "semana-quarta-olhar-aberto",
  "semana-quinta-palavra-guardada", "semana-quinta-palavras-sabias",
  "semana-sexta-alegria-nas-obras", "semana-sexta-alma-em-louvor",
  "semana-sabado-admirando-a-criacao", "semana-sabado-beleza-na-presenca",
  "semana-domingo-adoracao-humilde", "semana-domingo-servir-com-canto",
];
const added = messages.filter((m) => ids.includes(m.id));

describe("14 novas mensagens de Dias da Semana", () => {
  it("inclui exatamente 14 mensagens, duas para cada dia", () => {
    expect(added).toHaveLength(14);
    for (const weekday of ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]) {
      expect(added.filter((m) => m.title.startsWith(weekday))).toHaveLength(2);
    }
  });

  it("não repete fotos, mensagens, referências nem orações do catálogo", () => {
    for (const m of added) {
      for (const field of ["title", "verse", "reference", "caption", "photo"] as const) {
        expect(messages.filter((other) => other[field] === m[field])).toHaveLength(1);
      }
      expect(photoOf(m)).toBeTruthy();
      expect(hasOwnPrayer(m.id)).toBe(true);
      expect(messages.filter((other) => prayerFor(other.id).url === prayerFor(m.id).url)).toHaveLength(1);
      const recording = manifest.recordings.find((r) => r.key === m.id);
      expect(recording).toBeDefined();
      expect(recording?.text).toContain(m.verse);
      expect(manifest.recordings.filter((r) => r.text === recording?.text)).toHaveLength(1);
    }
  });

  it("mantém as 14 mensagens na categoria VIP Dias da Semana", () => {
    for (const m of added) {
      expect(m.category).toBe("semana");
      expect(isLocked(m, false)).toBe(true);
      expect(isLocked(m, true)).toBe(false);
    }
  });
});