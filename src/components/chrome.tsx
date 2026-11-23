import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChatIcon, ChevronLeft, GridIcon, HeartIcon, HomeSunIcon, SunIcon, UserIcon, WhatsAppIcon } from "./icons";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[560px] md:max-w-3xl", className)}>{children}</div>;
}

export function AppHeader({ title, subtitle, back }: { title: ReactNode; subtitle?: ReactNode; back?: boolean }) {
  const router = useRouter();
  return (
    <header className="bg-gradient-to-b from-peach-soft to-cream">
      <Container className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2 text-[14px] font-bold text-gold">
          {back && (
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => (window.history.length > 1 ? router.history.back() : router.navigate({ to: "/" }))}
              className="-ml-2 mr-1 grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-peach"
            >
              <ChevronLeft />
            </button>
          )}
          <SunIcon />
          Luz da Manhã
        </div>
        <h1 className="serif mt-3 text-[30px] font-semibold leading-[36px] text-ink">{title}</h1>
        {subtitle && <p className="serif text-[18px] italic text-ink-muted">{subtitle}</p>}
      </Container>
    </header>
  );
}

const tabs = [
  { to: "/", label: "Início", Icon: HomeSunIcon, exact: true },
  { to: "/temas", label: "Temas", Icon: GridIcon, exact: false },
  { to: "/favoritos", label: "Favoritos", Icon: HeartIcon, exact: false },
  { to: "/perfil", label: "Perfil VIP", Icon: UserIcon, exact: false },
] as const;

export function TabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-peach bg-cream/95 backdrop-blur pt-2 pb-[max(14px,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-[560px] justify-around text-[12px] font-bold md:max-w-3xl">
        {tabs.map(({ to, label, Icon, exact }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact }}
            className="flex h-[48px] min-w-[72px] flex-col items-center justify-center gap-1 rounded-[16px] px-2 text-ink-muted data-[status=active]:bg-peach-soft data-[status=active]:text-gold"
          >
            <Icon size={22} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function WaButton({ children, onClick, className, big, icon = "chat" }: { children: ReactNode; onClick?: () => void; className?: string; big?: boolean; icon?: "chat" | "wa" | "none" | ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2.5 rounded-[16px] bg-wa font-bold text-white transition-colors hover:bg-wa-dark active:scale-[0.99] disabled:opacity-60",
        big ? "h-[60px] rounded-full text-[18px] shadow-wa" : "h-[56px] text-[17px]",
        className,
      )}
    >
      {icon === "chat" ? <ChatIcon size={22} /> : icon === "wa" ? <WhatsAppIcon size={26} /> : icon === "none" ? null : icon}
      {children}
    </button>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("serif mb-3 mt-7 text-[20px] font-semibold text-ink", className)}>{children}</h2>;
}
