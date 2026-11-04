#!/usr/bin/env bash
# Usage: process_clip.sh <source.mp4> <start_s> <duration_s> <out.mp4> [speed=1] [stabilize=1]
# Two-pass vidstab stabilization, gentle natural grade, light denoise,
# conform to 1080x1920 @ 30 fps, high-quality intermediate (no audio).
set -euo pipefail
SRC="$1"; SS="$2"; DUR="$3"; OUT="$4"; SPEED="${5:-1}"; STAB="${6:-1}"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
# Read a little extra so stabilization has context at the edges.
STABF="vidstabtransform=input=$TMP/t.trf:smoothing=24:optzoom=1:zoomspeed=0.2:interpol=bicubic,"
if [ "$STAB" = "0" ]; then STABF=""; else
ffmpeg -v error -y -ss "$SS" -t "$DUR" -i "$SRC" -an \
  -vf "vidstabdetect=shakiness=6:accuracy=15:result=$TMP/t.trf" -f null -
fi
PTS="setpts=PTS/${SPEED}"
INTERP=""
if [ "$SPEED" != "1" ]; then INTERP=",minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"; fi
GRADE="colortemperature=temperature=6000:mix=0.6,eq=contrast=1.07:brightness=-0.01:saturation=1.15:gamma=0.98,curves=master='0/0 0.25/0.235 0.75/0.77 1/0.985'"
ffmpeg -v error -y -ss "$SS" -t "$DUR" -i "$SRC" -an \
  -vf "${STABF}hqdn3d=1.2:1.2:4:4,${GRADE},scale=1080:1920:flags=lanczos,${PTS},fps=30${INTERP},unsharp=5:5:0.25:5:5:0,format=yuv420p" \
  -c:v libx264 -preset slow -crf 14 -profile:v high -movflags +faststart "$OUT"
echo "ok $OUT $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s"
