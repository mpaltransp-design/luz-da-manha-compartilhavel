import type { Message } from "./messages";

export function artworkGreeting(m: Message): string | null {
  if (m.category === "bom-dia") return "Bom dia!";
  if (m.category === "boa-noite") return "Boa noite!";
  if (m.category === "aniversario") return "Feliz aniversário!";
  if (m.category === "semana") {
    // Use the message's weekday, never today's date: saved artwork stays reusable.
    const weekday = m.title.match(/^(segunda|terça|quarta|quinta|sexta|sábado|domingo)\b/iu)?.[1]?.toLocaleLowerCase("pt-BR");
    if (!weekday) return "Semana abençoada!";
    const label = weekday.charAt(0).toLocaleUpperCase("pt-BR") + weekday.slice(1);
    return `Feliz ${label}${weekday === "sábado" || weekday === "domingo" ? "" : "-feira"}!`;
  }
  return null;
}