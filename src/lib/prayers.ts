import general from "@/assets/oracao-da-manha.mp3.asset.json";

type Pointer = { url: string };
const files = import.meta.glob<Pointer>("@/assets/oracoes/*.mp3.asset.json", { eager: true, import: "default" });

/** Message-specific prayer audio, keyed by message id. */
const byMessage: Record<string, string> = {};
for (const [path, p] of Object.entries(files)) {
  const id = path.split("/").pop()!.replace(".mp3.asset.json", "");
  byMessage[id] = p.url;
}

export type Prayer = { key: string; url: string; filename: string };

/** Returns the prayer recorded for this message, or the general morning prayer. */
export function prayerFor(messageId?: string): Prayer {
  const url = messageId ? byMessage[messageId] : undefined;
  if (messageId && url) return { key: messageId, url, filename: `oracao-${messageId}.mp3` };
  return { key: "geral", url: general.url, filename: "oracao-da-manha.mp3" };
}

export function hasOwnPrayer(messageId: string): boolean {
  return messageId in byMessage;
}
