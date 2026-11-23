import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppHeader, Container, SectionTitle } from "@/components/chrome";
import { ChevronRight, CrownIcon, HeartIcon, WhatsAppIcon } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { setName, setVip, useFavorites, useName, useVip } from "@/lib/store";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil VIP — Mensagens do Dia" },
      { name: "description", content: "Seu nome na saudação, seu acesso VIP e suporte." },
      { property: "og:title", content: "Perfil VIP — Mensagens do Dia" },
      { property: "og:description", content: "Gerencie seu acesso VIP e suas preferências." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Profile,
});

const SUPPORT = `https://wa.me/?text=${encodeURIComponent("Olá! Preciso de ajuda com o app Mensagens do Dia.")}`;

function Profile() {
  const vip = useVip();
  const name = useName();
  const favs = useFavorites();
  const [draft, setDraft] = useState("");
  useEffect(() => setDraft(name), [name]);

  return (
    <div className="pb-32">
      <AppHeader title="Área de membros" subtitle={vip ? "Membro VIP vitalício" : "Plano grátis"} />
      <Container className="px-5">
        {vip ? (
          <div className="flex items-center gap-3 rounded-[var(--r-card)] bg-white p-5 shadow-sun">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-peach-soft text-gold"><CrownIcon /></span>
            <div>
              <p className="serif text-[19px] font-semibold text-ink">Acesso VIP ativo</p>
              <p className="text-[14px] text-ink-muted">Todas as mensagens, áudios e categorias liberados.</p>
            </div>
          </div>
        ) : (
          <Link to="/vip" className="block rounded-[var(--r-card)] bg-white p-5 shadow-sun">
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-gold">Acesso VIP</p>
            <p className="serif mt-2 text-[19px] font-semibold leading-[27px] text-ink">Libere Conforto & Luto, Aniversário e a oração diária</p>
            <span className="mt-4 flex h-[52px] items-center justify-center rounded-[16px] bg-wa font-bold text-white">Conhecer o VIP por R$ 27</span>
          </Link>
        )}

        <SectionTitle>Seu nome na saudação</SectionTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setName(draft);
            toast.success(draft.trim() ? `Pronto, ${draft.trim()}!` : "Nome removido");
          }}
          className="flex gap-2"
        >
          <label className="flex-1">
            <span className="sr-only">Seu nome</span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ex.: Maria"
              maxLength={30}
              className="h-[52px] w-full rounded-[16px] border border-peach bg-white px-4 text-[16px] text-ink outline-none placeholder:text-ink-muted focus:border-gold"
            />
          </label>
          <button type="submit" className="h-[52px] rounded-[16px] bg-gold px-5 text-[16px] font-bold text-white">Salvar</button>
        </form>

        <SectionTitle>Atalhos</SectionTitle>
        <div className="space-y-3">
          <Link to="/favoritos" className="flex min-h-[60px] items-center gap-3 rounded-[20px] bg-peach-soft px-4">
            <HeartIcon className="text-gold" />
            <div className="flex-1">
              <p className="text-[16px] font-bold text-ink">Meus Favoritos</p>
              <p className="text-[14px] text-ink-muted">{favs.length} {favs.length === 1 ? "mensagem salva" : "mensagens salvas"}</p>
            </div>
            <ChevronRight className="text-ink-muted" />
          </Link>
          <a href={SUPPORT} target="_blank" rel="noopener noreferrer" className="flex min-h-[60px] items-center gap-3 rounded-[20px] bg-peach-soft px-4">
            <WhatsAppIcon className="text-wa-dark" />
            <div className="flex-1">
              <p className="text-[16px] font-bold text-ink">Suporte VIP</p>
              <p className="text-[14px] text-ink-muted">Fale com a gente pelo WhatsApp</p>
            </div>
            <ChevronRight className="text-ink-muted" />
          </a>
        </div>

        <SectionTitle>Modo de teste</SectionTitle>
        <label className="flex items-center gap-3 rounded-[20px] border border-dashed border-gold/60 bg-cream px-4 py-3">
          <div className="flex-1">
            <p className="text-[16px] font-bold text-ink">Simular acesso VIP</p>
            <p className="text-[14px] text-ink-muted">Alterna entre Grátis e VIP neste aparelho para testar as vendas.</p>
          </div>
          <Switch checked={vip} onCheckedChange={(v) => { setVip(v); toast(v ? "Modo VIP ativado" : "Modo Grátis ativado"); }} aria-label="Simular acesso VIP" />
        </label>
      </Container>
    </div>
  );
}
