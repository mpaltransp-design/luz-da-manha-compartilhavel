import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader, Container } from "@/components/chrome";
import { HeartIcon } from "@/components/icons";
import { MessageGrid } from "@/components/MessageTile";
import { getMessage, type Message } from "@/lib/messages";
import { useFavorites } from "@/lib/store";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus Favoritos — Mensagens do Dia" },
      { name: "description", content: "As mensagens que você salvou para enviar de novo no WhatsApp." },
      { property: "og:title", content: "Meus Favoritos — Mensagens do Dia" },
      { property: "og:description", content: "Suas mensagens salvas, prontas para compartilhar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const ids = useFavorites();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const items = ids.map(getMessage).filter((m): m is Message => !!m);

  return (
    <div className="pb-32">
      <AppHeader title="Meus Favoritos" subtitle={items.length ? `${items.length} ${items.length === 1 ? "mensagem salva" : "mensagens salvas"}` : "Guarde as que tocam seu coração"} />
      <Container className="px-5">
        {!ready ? null : items.length ? (
          <MessageGrid items={items} />
        ) : (
          <div className="mt-4 rounded-[var(--r-card)] bg-white p-7 text-center shadow-sun">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-peach-soft text-gold"><HeartIcon size={26} /></span>
            <p className="serif mt-4 text-[20px] font-semibold text-ink">Nenhuma mensagem salva ainda</p>
            <p className="mt-2 text-[16px] leading-[24px] text-ink-muted">Toque no coração de uma mensagem para guardá-la aqui e enviar quando quiser.</p>
            <Link to="/" className="mt-5 inline-flex h-[52px] items-center rounded-[16px] border border-peach bg-white px-5 text-[16px] font-bold text-ink">Ver mensagens de hoje</Link>
          </div>
        )}
      </Container>
    </div>
  );
}
