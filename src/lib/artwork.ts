import type { Message } from "./messages";

export function artworkGreeting(m: Message): string | null {
  if (m.category === "bom-dia") return "Bom dia!";
  if (m.category === "boa-noite") return "Boa noite!";
  if (m.category === "aniversario") return "Feliz aniversário!";
  return null;
}