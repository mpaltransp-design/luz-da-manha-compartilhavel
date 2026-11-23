"""Mix a voice-only prayer MP3 with the shared background music from the manifest.
Usage: python3 scripts/mix-prayer.py <voice.mp3> <out.mp3>"""
import json, subprocess, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
m = json.loads((ROOT / "src/lib/prayer-recordings.json").read_text())["music"]
music = Path("/tmp/prayer-music.mp3")
if not music.exists():
    url = json.loads((ROOT / m["asset"]).read_text())["url"]
    subprocess.run(["curl", "-sfo", str(music), f"http://localhost:8080{url}"], check=True)
voice, out = sys.argv[1], sys.argv[2]
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", voice]))
total = m["intro"] + dur + m["outro"]
ms = int(m["intro"] * 1000)
f = (f"[1:a]atrim=0:{total},volume={m['volume']},afade=t=in:d=1.5,afade=t=out:st={total-3}:d=3[bg];"
     f"[0:a]adelay={ms}|{ms},apad[v];[v][bg]amix=inputs=2:duration=shortest:normalize=0,atrim=0:{total}[o]")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", voice, "-i", str(music), "-filter_complex", f,
                "-map", "[o]", "-ac", "1", "-b:a", "128k", out], check=True)
