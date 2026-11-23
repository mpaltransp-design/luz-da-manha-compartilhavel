export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="lm-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--gold)" stopOpacity="0.75" />
          <stop offset="1" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="var(--cream)" stroke="var(--gold)" strokeWidth="1.5" />
      <g stroke="var(--gold)" strokeWidth="2" strokeLinecap="round">
        <path d="M24 9v5M13 14l3 3.5M35 14l-3 3.5M8 25h5M35 25h5" />
      </g>
      <path d="M13 31a11 11 0 0 1 22 0z" fill="url(#lm-sun)" />
      <path d="M9 31h30M14 35.5h20" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={40} />
      <span className="flex flex-col leading-none">
        <span className="serif text-[20px] font-semibold text-ink">Luz da Manhã</span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Mensagens & Orações</span>
      </span>
    </span>
  );
}
