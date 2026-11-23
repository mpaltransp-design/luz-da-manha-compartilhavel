"""Render one prayer with the versioned voice settings; never upload automatically."""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads((ROOT / "src/lib/prayer-recordings.json").read_text())
key = sys.argv[1]
recording = next((r for r in manifest["recordings"] if r["key"] == key), None)
if recording is None:
    raise SystemExit(f"Unknown prayer: {key}")
folder = Path("/tmp/prayers-v3")
folder.mkdir(parents=True, exist_ok=True)
prompt = folder / f"{key}.txt"
prompt.write_text(recording["text"])
settings = manifest["synthesis"]
subprocess.run([
    "lovable", "audio", "generate", "--model", settings["model"],
    "--prompt-file", str(prompt), "--out", str(folder / f"{key}.mp3"),
    "--set", f"voice={settings['voice']}", "--set", f"speed={settings['speed']}",
    "--set", f"instructions={settings['instructions']}",
    "--set", "response_format=mp3",
], check=True)