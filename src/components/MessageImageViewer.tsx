import { useEffect, useState } from "react";
import { Download, Maximize2 } from "lucide-react";
import { MessageArtwork } from "./MessageArtwork";
import { WaButton } from "./chrome";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { downloadShareImage, prepareShareImage, shareImageOnly, shareToWhatsApp } from "@/lib/share";
import type { Message } from "@/lib/messages";
import { Link } from "@tanstack/react-router";

export function DownloadImageButton({ m }: { m: Message }) {
  const [busy, setBusy] = useState(false);
  return <Button disabled={busy} className="h-12 w-full rounded-full bg-gold text-base font-bold text-white hover:bg-gold/90" onClick={async () => {
    setBusy(true);
    try { await downloadShareImage(m); } finally { setBusy(false); }
  }}><Download />{busy ? "Preparando imagem…" : "Baixar imagem"}</Button>;
}

export function ShareImageOnlyButton({ m }: { m: Message }) {
  return <WaButton icon="wa" className="h-12 rounded-full text-base" onClick={() => void shareImageOnly(m)}>Compartilhar só a imagem</WaButton>;
}

export function ShareImageAndMessageButton({ m }: { m: Message }) {
  return <WaButton icon="wa" className="h-12 rounded-full text-base" onClick={() => void shareToWhatsApp(m)}>Compartilhar imagem e mensagem</WaButton>;
}

export function MessageImageViewer({ m, locked }: { m: Message; locked: boolean }) {
  useEffect(() => {
    if (!locked) void prepareShareImage(m).catch(() => {});
  }, [m, locked]);
  return <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="relative mt-2 block h-auto w-full whitespace-normal p-0 hover:bg-transparent" aria-label="Ampliar imagem">
        <MessageArtwork m={m} />
        <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-cream/95 text-ink" title="Ampliar imagem"><Maximize2 /></span>
      </Button>
    </DialogTrigger>
    <DialogContent aria-describedby={undefined} className="flex max-h-[94dvh] w-[calc(100%-24px)] max-w-2xl flex-col gap-3 rounded-[var(--r-card)] p-4">
      <DialogTitle className="serif pr-8 text-xl text-ink">{m.title}</DialogTitle>
      <div className="min-h-0 overflow-y-auto"><MessageArtwork m={m} className="mx-auto max-w-[520px]" /></div>
      <div className="shrink-0 space-y-2">
        {locked ? <Button asChild className="h-12 w-full"><Link to="/vip">Desbloquear com VIP</Link></Button> : <>
          <ShareImageOnlyButton m={m} />
          <ShareImageAndMessageButton m={m} />
          <DownloadImageButton m={m} />
        </>}
      </div>
    </DialogContent>
  </Dialog>;
}