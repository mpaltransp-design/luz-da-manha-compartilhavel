import type React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader, Container } from "@/components/chrome";
import { ChevronRight, LockIcon } from "@/components/icons";
import { type CategoryId, categories, messages, photoOf } from "@/lib/messages";
import { useVip } from "@/lib/store";

export const Route = createFileRoute("/temas")({
  head: () => ({
    meta: [
      { title: "Temas — Mensagens do Dia" },
      { name: "description", content: "Bom dia, bênçãos, paz, gratidão, boa noite, conforto e aniversário: escolha o tema da sua mensagem." },
      { property: "og:title", content: "Temas — Mensagens do Dia" },
      { property: "og:description", content: "Escolha o tema da mensagem para enviar no WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Themes,
});

function Themes() {
  const vip = useVip();
  return (
    <div className="pb-32">
      <AppHeader title="Temas" subtitle="Uma palavra para cada momento" />
      <Container className="grid gap-3 px-5 md:grid-cols-2">
        {categories.map((c) => {
          const items = messages.filter((m) => m.category === c.id);
          const cover = items[0];
          const locked = c.vip && !vip;
          return (
            <ThemeLink key={c.id} cat={c.id} locked={locked}>
              {cover && <img src={photoOf(cover)} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-[16px] object-cover" />}
              <div className="min-w-0 flex-1">
                <p className="text-[17px] font-bold text-ink">{c.label}</p>
                <p className="text-[14px] text-ink-muted">{items.length} mensagens</p>
              </div>
              {locked ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-[13px] font-bold text-gold"><LockIcon size={14} /> VIP</span>
              ) : (
                <ChevronRight className="text-ink-muted" />
              )}
            </ThemeLink>
          );
        })}
      </Container>
    </div>
  );
}

function ThemeLink({ cat, locked, children }: { cat: CategoryId; locked: boolean; children: React.ReactNode }) {
  const cls = "flex items-center gap-3 rounded-[20px] bg-peach-soft p-2 pr-4";
  return locked ? (
    <Link to="/vip" className={cls}>{children}</Link>
  ) : (
    <Link to="/" search={{ cat }} className={cls}>{children}</Link>
  );
}
