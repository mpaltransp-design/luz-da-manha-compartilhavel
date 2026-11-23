import { useNavigate } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import prayer from "@/assets/oracao-da-manha.mp3.asset.json";
import { LockIcon, PauseIcon, PlayIcon } from "./icons";
import { useVip } from "@/lib/store";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function PrayerPlayer() {
  const vip = useVip();
  const navigate = useNavigate();
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(73);

  useEffect(() => () => ref.current?.pause(), []);

  const toggle = async () => {
    if (!vip) {
      navigate({ to: "/vip" });
      return;
    }
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      setLoading(true);
      try {
        await a.play();
      } catch {
        setLoading(false);
      }
    } else a.pause();
  };

  const pct = dur ? Math.min(100, (time / dur) * 100) : 0;
  const started = time > 0 || playing;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={!vip ? "Oração do dia — exclusivo VIP" : playing ? "Pausar oração" : "Ouvir oração de 1 minuto"}
      className="relative flex h-[52px] min-w-0 flex-1 items-center gap-3 overflow-hidden rounded-full bg-white pl-2 pr-3 text-left"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-white">
        {!vip ? <LockIcon size={16} /> : loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : playing ? <PauseIcon /> : <PlayIcon className="ml-0.5" />}
      </span>
      <span className="min-w-0 flex-1 whitespace-nowrap text-[16px] font-bold text-ink">
        {started ? `${fmt(time)} / ${fmt(dur)}` : "Oração · 1 min"}
      </span>
      {started && <span className="absolute bottom-0 left-0 h-[3px] bg-gold transition-[width]" style={{ width: `${pct}%` }} />}
      <audio
        ref={ref}
        src={prayer.url}
        preload="none"
        onPlaying={() => {
          setLoading(false);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onWaiting={() => setLoading(true)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && setDur(e.currentTarget.duration)}
        onEnded={() => {
          setPlaying(false);
          setTime(0);
        }}
      />
    </button>
  );
}

/** VIP-only button that downloads the 1-minute prayer audio as an .mp3 file. */
export function PrayerDownloadButton() {
  const vip = useVip();
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!vip) return;
    let alive = true;
    fetch(prayer.url)
      .then((r) => r.blob())
      .then((b) => {
        if (alive) setBlob(b);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [vip]);

  if (!vip) return null;

  const download = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "oracao-da-manha.mp3";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
    toast.success("Oração baixada! Envie no WhatsApp 🙏");
  };

  return (
    <button
      type="button"
      onClick={download}
      disabled={!blob}
      aria-label="Baixar oração em áudio"
      title="Baixar oração em áudio"
      className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-white text-ink-muted transition-transform active:scale-90 disabled:opacity-50"
    >
      <Download size={20} />
    </button>
  );
}
