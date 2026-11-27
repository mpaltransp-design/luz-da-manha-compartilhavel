import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import friends from "@/assets/photos/friends.jpg.asset.json";
import { AppHeader, Container, SectionTitle, WaButton } from "@/components/chrome";
import { BanIcon, BoltIcon, CheckCircleIcon, CrownIcon, HeadphonesIcon, HeartIcon, ImageIcon, ShieldIcon, UnlockIcon } from "@/components/icons";
import { setVip, useVip } from "@/lib/store";

export const Route = createFileRoute("/vip")({
  head: () => ({
    meta: [
      { title: "Acesso VIP Completo por R$ 27 — Mensagens do Dia" },
      { name: "description", content: "Pagamento único, acesso vitalício: imagens em alta resolução, categorias exclusivas, áudios diários de oração e zero anúncios." },
      { property: "og:title", content: "Acesso VIP Completo por R$ 27 — Mensagens do Dia" },
      { property: "og:description", content: "Abençoe sua família todos os dias com mensagens exclusivas. Garantia de 7 dias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VipOffer,
});

const benefits = [
  { Icon: ImageIcon, text: "Imagens em alta resolução sem limites" },
  { Icon: HeartIcon, text: "Categorias exclusivas: Luto, Conforto e Aniversário" },
  { Icon: HeadphonesIcon, text: "Áudios diários de oração de 1 minuto" },
  { Icon: BanIcon, text: "Zero anúncios" },
];

const CHECKOUT_URL = import.meta.env['VITE_KIWIFY_CHECKOUT_URL'] as string | undefined;

function VipOffer() {
  const vip = useVip();
  const [busy, setBusy] = useState(false);

  const buy = () => {
    if (CHECKOUT_URL) {
      window.location.href = CHECKOUT_URL;
      return;
    }
    // No checkout connected yet: unlock in this device so the VIP flow can be tried.
    setBusy(true);
    window.setTimeout(() => {
      setVip(true);
      setBusy(false);
      toast.success("Acesso VIP liberado! 🎉", { description: "Todas as mensagens e áudios estão disponíveis." });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  return (
    <div className="pb-32">
      <AppHeader back title="Acesso VIP Completo" subtitle="Pagamento único · Acesso vitalício" />
      <Container className="px-5">
        {vip && (
          <div className="mb-5 flex items-center gap-3 rounded-[20px] bg-wa/10 p-4 text-ink">
            <CrownIcon className="shrink-0 text-gold" />
            <div className="flex-1">
              <p className="font-bold">Você já é VIP</p>
              <p className="text-[14px] text-ink-muted">Todas as categorias e áudios estão liberados.</p>
            </div>
            <Link to="/" className="rounded-full bg-white px-4 py-2 text-[14px] font-bold text-gold">Ver</Link>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-peach-soft px-2.5 py-1 text-[13px] font-bold text-gold">Acesso Exclusivo Vitalício</span>
          <span className="inline-flex items-center rounded-full bg-peach-soft px-2.5 py-1 text-[13px] font-bold text-gold">Garantia de 7 dias</span>
        </div>
        <p className="serif mt-5 max-w-[340px] text-[24px] font-semibold leading-[31px] text-ink">Abençoe sua família todos os dias com mensagens exclusivas</p>

        <section className="mt-6 rounded-[var(--r-card)] border border-peach bg-white px-5 py-7 text-center shadow-sun">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-gold">Pagamento único</p>
          <p className="mt-3 text-[16px] text-ink-muted">
            De <s>R$ 67</s> por apenas
          </p>
          <p className="serif text-[56px] font-semibold leading-[64px] text-ink">R$ 27</p>
          <p className="mt-1 text-[16px] text-ink-muted">no Pix ou cartão</p>
        </section>

        <SectionTitle className="mt-8">O que você recebe</SectionTitle>
        <ul className="space-y-3">
          {benefits.map(({ Icon, text }) => (
            <li key={text} className="flex min-h-[60px] items-center gap-3 rounded-[20px] bg-peach-soft px-4 py-3">
              <Icon className="shrink-0 text-gold" />
              <span className="text-[16px] font-bold leading-[23px] text-ink">{text}</span>
            </li>
          ))}
        </ul>

        <figure className="mt-7 rounded-[var(--r-card)] bg-white p-5 shadow-sun">
          <p className="text-[18px] tracking-[0.15em] text-gold" aria-label="5 estrelas">★★★★★</p>
          <blockquote className="serif mt-2 text-[19px] italic leading-[28px] text-ink">“Minhas irmãs e minha mãe amam as mensagens todo dia!”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <img src={friends.url} alt="" className="h-11 w-11 rounded-full object-cover" />
            <span className="text-[15px] font-bold text-ink">Dona Rosângela, Belo Horizonte</span>
          </figcaption>
        </figure>

        {vip ? (
          <Link to="/temas" className="mt-7 flex h-[56px] items-center justify-center gap-2 rounded-[16px] bg-wa text-[17px] font-bold text-white">
            <CrownIcon /> Ver mensagens exclusivas
          </Link>
        ) : (
          <WaButton className="mt-7" onClick={buy} icon={busy ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <UnlockIcon />}>
            {busy ? "Liberando seu acesso…" : "Garantir Meu Acesso por R$ 27"}
          </WaButton>
        )}

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[13px] leading-[17px] text-ink-muted">
          <div className="flex flex-col items-center gap-1.5"><ShieldIcon className="text-gold" />Pagamento Seguro Kiwify</div>
          <div className="flex flex-col items-center gap-1.5"><BoltIcon className="text-gold" />Acesso Imediato</div>
          <div className="flex flex-col items-center gap-1.5"><CheckCircleIcon className="text-gold" />7 dias de garantia incondicional</div>
        </div>
      </Container>
    </div>
  );
}
