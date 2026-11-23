import { Link, useNavigate } from "@tanstack/react-router";
import { ChatIcon, LockIcon } from "./icons";
import { isLocked, photoOf, type Message } from "@/lib/messages";
import { shareToWhatsApp } from "@/lib/share";
import { useVip } from "@/lib/store";

export function MessageTile({ m }: { m: Message }) {
  const vip = useVip();
  const locked = isLocked(m, vip);
  const navigate = useNavigate();
  return (
    <div className="relative aspect-[171/200] overflow-hidden rounded-[var(--r-card)] bg-peach">
      {locked ? (
        <Link to="/vip" className="absolute inset-0" aria-label={`${m.title} — exclusivo VIP`}>
        <img src={photoOf(m)} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
        <span className="serif absolute bottom-3.5 left-3 right-[64px] text-[17px] leading-[20px] text-white">{m.title}</span>
        {locked && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2.5 py-1 text-[12px] font-bold text-gold">
            <LockIcon size={14} /> VIP
          </span>
        )}
        </Link>
      ) : (
        <Link to="/mensagem/$id" params={{ id: m.id }} className="absolute inset-0" aria-label={m.title}>
        <img src={photoOf(m)} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
        <span className="serif absolute bottom-3.5 left-3 right-[64px] text-[17px] leading-[20px] text-white">{m.title}</span>
        {locked && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2.5 py-1 text-[12px] font-bold text-gold">
            <LockIcon size={14} /> VIP
          </span>
        )}
        </Link>
      )}
      <button
        type="button"
        aria-label={locked ? "Desbloquear com VIP" : `Compartilhar “${m.title}” no WhatsApp`}
        onClick={() => (locked ? navigate({ to: "/vip" }) : void shareToWhatsApp(m))}
        className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-wa text-white shadow-wa hover:bg-wa-dark"
      >
        {locked ? <LockIcon size={18} /> : <ChatIcon size={20} />}
      </button>
    </div>
  );
}

export function MessageGrid({ items }: { items: Message[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map((m) => (
        <MessageTile key={m.id} m={m} />
      ))}
    </div>
  );
}
