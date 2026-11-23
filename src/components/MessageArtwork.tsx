import { SunIcon } from "./icons";
import { artworkGreeting } from "@/lib/artwork";
import { photoOf, type Message } from "@/lib/messages";
import { cn } from "@/lib/utils";

export function MessageArtwork({ m, className }: { m: Message; className?: string }) {
  const greeting = artworkGreeting(m);
  return (
    <div className={cn("message-artwork relative aspect-[4/5] w-full overflow-hidden rounded-[var(--r-card)] shadow-sun", className)}>
      <img src={photoOf(m)} alt={m.title} className="h-full w-full object-cover object-bottom" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/80 via-60% to-transparent" />
      <div className="artwork-copy absolute inset-x-0 top-0 flex flex-col items-center text-center">
        <SunIcon size={24} className="text-gold" />
        {greeting && <p className="artwork-greeting serif font-semibold text-gold">{greeting}</p>}
        <p className={cn("artwork-verse serif font-semibold text-ink", m.verse.length > 110 && "artwork-verse-long")}>“{m.verse}”</p>
        <p className="artwork-reference serif italic text-ink-muted">{m.reference}</p>
      </div>
    </div>
  );
}