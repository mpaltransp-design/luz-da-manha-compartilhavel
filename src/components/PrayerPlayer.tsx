import { Link, useNavigate } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { prayerFor } from "@/lib/prayers";
import { downloadPrayerAudio, preparePrayerAudio, sharePrayerAudio } from "@/lib/share";
import { HeadphonesIcon, LockIcon, PauseIcon, PlayIcon } from "./icons";
import { useVip } from "@/lib/store";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function PrayerPlayer({ messageId }: { messageId?: string }) {
  const prayer = prayerFor(messageId);
  const vip = useVip();
  const navigate = useNavigate();
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(30);

  useEffect(() => () => ref.current?.pause(), []);
  useEffect(() => {
    setPlaying(false);
    setLoading(false);
    setTime(0);
  }, [prayer.url]);

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
      aria-label={!vip ? "Oração do dia — exclusivo VIP" : playing ? "Pausar oração" : "Ouvir oração do dia"}
      className="relative flex h-[52px] min-w-0 flex-1 items-center gap-3 overflow-hidden rounded-full bg-white pl-2 pr-3 text-left"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-white">
        {!vip ? <LockIcon size={16} /> : loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : playing ? <PauseIcon /> : <PlayIcon className="ml-0.5" />}
      </span>
      <span className="min-w-0 flex-1 whitespace-nowrap text-[16px] font-bold text-ink">
        {started ? `${fmt(time)} / ${fmt(dur)}` : "Ouvir oração"}
      </span>
      {started && <span className="absolute bottom-0 left-0 h-[3px] bg-gold transition-[width]" style={{ width: `${pct}%` }} />}
      <audio
        key={prayer.url}
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
export function PrayerDownloadButton({ messageId }: { messageId?: string }) {
  const vip = useVip();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!vip) return;
    let alive = true;
    setReady(false);
    preparePrayerAudio(messageId)
      .then(() => {
        if (alive) setReady(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [vip, messageId]);

  if (!vip) return null;

  const download = () => {
    void downloadPrayerAudio(messageId).then((ok) => {
      if (ok) toast.success("Oração baixada! Envie no WhatsApp 🙏");
    });
  };

  return (
    <button
      type="button"
      onClick={download}
      disabled={!ready}
      aria-label="Baixar oração em áudio"
      title="Baixar oração em áudio"
      className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-white text-ink-muted transition-transform active:scale-90 disabled:opacity-50"
    >
      <Download size={20} />
    </button>
  );
}

/**
 * Wide button that shares the 1-minute prayer audio on WhatsApp.
 * Free users see a locked teaser that leads to the VIP offer.
 */
export function PrayerShareButton({ messageId }: { messageId?: string }) {
  const vip = useVip();

  useEffect(() => {
    if (!vip) return;
    void preparePrayerAudio(messageId).catch(() => {});
  }, [vip, messageId]);

  if (!vip) {
    return (
      <Link
        to="/vip"
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-base font-bold text-white"
      >
        <LockIcon size={18} /> Compartilhar Oração em Áudio
        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-gold">VIP</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void sharePrayerAudio(messageId)}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold text-base font-bold text-white transition-transform active:scale-[0.98]"
    >
      <HeadphonesIcon size={20} /> Compartilhar Oração em Áudio
    </button>
  );
}
