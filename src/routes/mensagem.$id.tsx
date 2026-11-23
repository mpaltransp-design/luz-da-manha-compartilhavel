import type React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppHeader, Container, SectionTitle, WaButton } from "@/components/chrome";
import { CopyIcon, HeartIcon, LockIcon, ShareUpIcon } from "@/components/icons";
import { DownloadImageButton, MessageImageViewer } from "@/components/MessageImageViewer";
import { PrayerPlayer } from "@/components/PrayerPlayer";
import { categoryById, getMessage, isLocked, photoOf, relatedMessages } from "@/lib/messages";
import { copyCaption, shareToWhatsApp } from "@/lib/share";
import { toggleFavorite, useFavorites, useShareCount, useVip } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mensagem/$id")({
  loader: ({ params }) => {
    const m = getMessage(params.id);
    if (!m) throw notFound();
    return { id: m.id };
  },
  head: ({ loaderData }) => {
    const m = loaderData ? getMessage(loaderData.id) : undefined;
    if (!m) return { meta: [{ title: "Mensagem indisponível — Mensagens do Dia" }, { name: "robots", content: "noindex" }] };
    const title = `${m.title} · ${m.reference} — Mensagens do Dia`;
    const desc = `“${m.verse}” Compartilhe esta mensagem no WhatsApp.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pb-32">
      <AppHeader back title="Mensagem não encontrada" subtitle="Ela pode ter sido removida" />
      <Container className="px-5">
        <Link to="/" className="mt-6 inline-flex h-[52px] items-center rounded-[16px] border border-peach bg-white px-5 font-bold text-ink">Voltar ao início</Link>
      </Container>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { id } = Route.useLoaderData();
  const m = getMessage(id);
  if (!m) throw notFound();
  const cat = categoryById(m.category);
  const vip = useVip();
  const favs = useFavorites();
  const fav = favs.includes(m.id);
  const shares = useShareCount(m.id, m.baseShares);
  const locked = isLocked(m, vip);

  const onFav = () => {
    const saved = toggleFavorite(m.id);
    toast(saved ? "Salva nos Favoritos 💛" : "Removida dos Favoritos");
  };

  return (
    <div className="pb-32">
      <AppHeader back title={cat.heading} subtitle={m.reference} />
      <Container className="px-5">
        <div className="md:mx-auto md:max-w-[480px]">
          <MessageImageViewer m={m} locked={locked} />

          <div className="mt-5 flex items-center gap-1.5 rounded-full bg-peach-soft p-2">
            <button
              type="button"
              onClick={onFav}
              aria-pressed={fav}
              aria-label={fav ? "Remover dos favoritos" : "Salvar nos favoritos"}
              className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-white"
            >
              <HeartIcon filled={fav} className={cn("transition-transform active:scale-90", fav ? "text-destructive" : "text-ink-muted")} />
            </button>
            <PrayerPlayer />
            <span className="flex shrink-0 items-center gap-1 pl-1 pr-2 text-[15px] font-bold text-ink-muted" aria-label={`${shares} compartilhamentos`}>
              <ShareUpIcon size={18} /> {shares.toLocaleString("pt-BR")}
            </span>
          </div>

          <div className="mt-5 rounded-[var(--r-card)] border border-peach bg-white/80 p-5">
            <p className="text-[16px] leading-[26px] text-ink">{m.caption}</p>
            <button
              type="button"
              onClick={() => (locked ? undefined : void copyCaption(m))}
              disabled={locked}
              className="mt-4 inline-flex h-[44px] items-center gap-2 rounded-full bg-peach-soft px-5 text-[16px] font-bold text-ink hover:bg-peach disabled:opacity-50"
            >
              <CopyIcon size={18} /> Copiar Legenda
            </button>
          </div>

          {locked ? (
            <Link to="/vip" className="mt-5 flex h-[60px] items-center justify-center gap-2 rounded-full bg-wa text-[18px] font-bold text-white shadow-wa">
              <LockIcon /> Desbloquear com VIP
            </Link>
          ) : (
            <WaButton big icon="wa" className="mt-5" onClick={() => void shareToWhatsApp(m)}>
              Compartilhar no WhatsApp
            </WaButton>
          )}
          {!locked && <div className="mt-3"><DownloadImageButton m={m} /></div>}
        </div>

        <SectionTitle className="mt-8">{cat.related}</SectionTitle>
      </Container>
      <div className="no-scrollbar overflow-x-auto">
        <Container className="flex gap-3 px-5">
          {relatedMessages(m).map((r) => {
            const rl = isLocked(r, vip);
            return (
              <RelatedLink key={r.id} id={r.id} locked={rl}>
                <span className="relative block aspect-[150/200] overflow-hidden rounded-[22px] bg-peach">
                  <img src={photoOf(r)} alt="" loading="lazy" className="h-full w-full object-cover" />
                  {rl && <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2 py-0.5 text-[12px] font-bold text-gold"><LockIcon size={12} /> VIP</span>}
                </span>
                <span className="mt-2 block text-[15px] font-bold text-ink">{r.title}</span>
              </RelatedLink>
            );
          })}
        </Container>
      </div>
    </div>
  );
}

function RelatedLink({ id, locked, children }: { id: string; locked: boolean; children: React.ReactNode }) {
  const cls = "w-[150px] shrink-0";
  return locked ? (
    <Link to="/vip" className={cls}>{children}</Link>
  ) : (
    <Link to="/mensagem/$id" params={{ id }} className={cls}>{children}</Link>
  );
}
