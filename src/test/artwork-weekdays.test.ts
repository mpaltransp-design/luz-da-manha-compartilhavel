import { describe, expect, it } from "vitest";
import { artworkGreeting } from "@/lib/artwork";
import { getMessage, messages } from "@/lib/messages";

describe("Reusable weekday artwork", () => {
  it.each([
    ["segunda-de-vitorias", "Feliz Segunda-feira!"],
    ["semana-terca-de-fe", "Feliz Terça-feira!"],
    ["quarta-de-descanso", "Feliz Quarta-feira!"],
    ["semana-quinta-de-esperanca", "Feliz Quinta-feira!"],
    ["sexta-de-gratidao", "Feliz Sexta-feira!"],
    ["semana-sabado-de-alegria", "Feliz Sábado!"],
    ["domingo-na-casa-do-senhor", "Feliz Domingo!"],
    ["semana-recomeco-da-semana", "Semana abençoada!"],
  ])("uses the weekday belonging to %s", (id, expected) => {
    const message = getMessage(id);
    if (!message) throw new Error(`Missing catalog message: ${id}`);
    expect(artworkGreeting(message)).toBe(expected);
  });

  it("never adds a calendar date to weekday artwork", () => {
    const weekly = messages.filter((message) => message.category === "semana");
    expect(weekly.length).toBeGreaterThan(0);
    for (const message of weekly) {
      expect(artworkGreeting(message)).toBeTruthy();
      expect(artworkGreeting(message)).not.toMatch(/\d/);
    }
  });
});