import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Container, SectionTitle, WaButton } from "@/components/chrome";
import { HeadphonesIcon, HeartIcon, UserIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { MessageGrid } from "@/components/MessageTile";
import { HomeThemes } from "@/components/HomeThemes";
import { categoryById, filterMessages, messageOfTheDay, photoOf, type CategoryId } from "@/lib/messages";
import { shareToWhatsApp } from "@/lib/share";
import { useName, useVip } from "@/lib/store";
import { artworkGreeting } from "@/lib/artwork";

const chipIds = ["todas", "bom-dia", "bencaos", "paz", "gratidao", "boa-noite", "conforto", "aniversario", "protecao", "familia", "cura", "amizade", "semana", "trabalho"] as const;

export const Route = createFileRoute("/")({
  validateSearch: z.object({ cat: z.enum(chipIds).optional().catch(undefined) }),
  head: () => ({
    meta: [
      { title: "Mensagens do Dia — Bom dia! Espalhe amor hoje" },
      { name: "description", content: "Mensagens de bom dia, versículos e bênçãos prontas para compartilhar no WhatsApp com a sua família." },
      { property: "og:title", content: "Mensagens do Dia — Bom dia! Espalhe amor hoje" },
      { property: "og:description", content: "Mensagens de bom dia, versículos e bênçãos prontas para compartilhar no WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function greeting(h: number) {
  return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
}

function Home() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const vip = useVip();
  const name = useName();
  const chip: CategoryId | "todas" = cat ?? "todas";
  // Date-dependent content is decided after hydration so SSR and client agree.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const daily = messageOfTheDay(now ?? new Date(2026, 10, 23));
  const today = now ? now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }) : "";
  const hello = now ? greeting(now.getHours()) : "Bom dia";

  const list = filterMessages(chip).filter((m) => chip !== "todas" || m.id !== daily.id);

  const pick = (id: CategoryId | "todas") => {
    if (id !== "todas" && categoryById(id).vip && !vip) {
      navigate({ to: "/vip" });
      return;
    }
    navigate({ search: id === "todas" ? {} : { cat: id }, replace: true, resetScroll: false });
  };

  return (
    <div className="pb-32">
      <header className="relative overflow-hidden bg-gradient-to-b from-peach to-cream">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
        <Container className="relative px-5 pb-5 pt-5">
          <Logo />
          <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.15em] text-gold first-letter:uppercase">{today || "\u00a0"}</p>
          <h1 className="serif mt-1 text-[32px] font-semibold leading-[38px] text-ink">{hello}{name ? `, ${name}` : ""}!</h1>
          <p className="serif text-[18px] italic text-ink-muted">Espalhe amor e fé hoje</p>
        </Container>
      </header>

      <HomeThemes active={chip} vip={vip} onSelect={pick} />

      <Container className="px-5">
        {chip === "todas" && (
          <section className="mt-4 rounded-[var(--r-card)] bg-card p-3 shadow-sun ring-1 ring-gold/30 md:max-w-[440px]">
            <Link to="/mensagem/$id" params={{ id: daily.id }} className="relative block aspect-[329/300] overflow-hidden rounded-[22px]">
              <img src={photoOf(daily)} alt="" className="h-full w-full object-cover object-bottom" />
              <span className="absolute inset-0 bg-gradient-to-b from-peach-soft/95 via-peach-soft/70 to-transparent" />
              <span className="absolute inset-x-0 top-0 p-5">
                <span className="inline-flex rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground">Palavra de hoje</span>
                {artworkGreeting(daily) && <span className="serif mt-2 block text-[26px] font-semibold text-gold">{artworkGreeting(daily)}</span>}
                <span className="serif mt-2 block text-[21px] font-medium leading-[29px] text-ink">“{daily.verse}”</span>
                <span className="serif mt-2 block text-[17px] font-semibold italic text-gold">{daily.reference}</span>
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1.5 text-[12px] font-bold text-ink shadow-sun">
                <HeadphonesIcon size={15} className="text-gold" /> Oração em áudio inclusa
              </span>
            </Link>
            <WaButton className="mt-3" onClick={() => void shareToWhatsApp(daily)}>
              Compartilhar no WhatsApp
            </WaButton>
          </section>
        )}

        <SectionTitle className={chip === "todas" ? "mt-8" : "mt-5"}>
          {chip === "todas" ? "Para enviar hoje" : categoryById(chip).label}
        </SectionTitle>
        {list.length > 0 ? (
          <MessageGrid items={list} />
        ) : (
          <p className="rounded-[20px] bg-peach-soft p-5 text-[16px] text-ink-muted">Nenhuma mensagem nesta categoria ainda.</p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link to="/favoritos" className="flex min-h-[60px] items-center gap-3 rounded-[20px] bg-peach-soft px-4 text-[16px] font-bold text-ink">
            <HeartIcon size={22} className="shrink-0 text-gold" /> Meus Favoritos
          </Link>
          <Link to="/perfil" className="flex min-h-[60px] items-center gap-3 rounded-[20px] border border-peach bg-cream px-4 text-[16px] font-bold text-ink">
            <UserIcon size={22} className="shrink-0 text-gold" /> Área de membros
          </Link>
        </div>
      </Container>
    </div>
  );
}
