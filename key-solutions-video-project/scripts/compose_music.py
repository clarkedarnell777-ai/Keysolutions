#!/usr/bin/env python3
"""Original smooth-jazz / piano-lounge score generator for Key Solutions videos.

Every note here is composed algorithmically from scratch (no samples of existing
recordings). Rendered with FluidSynth + FluidR3_GM (MIT licensed), so the output
is cleared for commercial use.

Usage: compose_music.py <variant> <bars> <bpm> <out.mid> [transpose]
"""
import random
import sys

import mido

TPB = 480  # ticks per beat
SWING = 2 / 3  # swung eighth position within a beat

# Rootless jazz voicings (concert pitch, key of F) + bass root.
CHORDS = {
    "Fmaj9": ([57, 60, 64, 67], 41),
    "Dm9": ([53, 57, 60, 64], 38),
    "Gm9": ([58, 62, 65, 69], 43),
    "C13": ([58, 62, 64, 69], 36),
    "Am9": ([55, 60, 64, 71], 45),
    "D7": ([54, 60, 64, 71], 38),
    "Bbmaj9": ([57, 60, 62, 65], 46),
    "Em7b5": ([55, 58, 62, 64], 40),
    "A7": ([55, 61, 66, 70], 45),
}

# Progressions: list of bars, each bar a list of chords (1 = whole bar, 2 = halves).
PROGRESSIONS = {
    "a": [["Fmaj9"], ["Dm9"], ["Gm9"], ["C13"], ["Am9", "D7"], ["Gm9"], ["C13"],
          ["Bbmaj9"], ["Gm9", "C13"], ["Fmaj9"]],
    "b": [["Bbmaj9"], ["Am9"], ["Gm9"], ["C13"], ["Fmaj9"], ["Em7b5", "A7"], ["Dm9"],
          ["Gm9", "C13"], ["Bbmaj9"], ["Fmaj9"]],
    "c": [["Dm9"], ["Gm9"], ["C13"], ["Fmaj9"], ["Bbmaj9"], ["Em7b5", "A7"], ["Dm9"],
          ["Gm9"], ["C13"], ["Fmaj9"]],
}

# F major pentatonic + colour tones for the melody (piano right hand).
SCALE = [65, 67, 69, 72, 74, 76, 77, 79, 81]

COMP_PATTERNS = [  # (beat offset, length beats, velocity)
    [(0, 1.5, 62), (1 + SWING, 0.6, 54), (3, 0.9, 50)],
    [(0, 0.9, 58), (2 + SWING, 1.2, 56)],
    [(SWING, 1.2, 55), (2, 0.6, 50), (3 + SWING, 0.4, 52)],
    [(0, 2.5, 60), (3 + SWING, 0.3, 48)],
]


def beat_ticks(b):
    return int(round(b * TPB))


def build(variant, bars, bpm, transpose=0):
    rnd = random.Random(f"keysolutions-{variant}")
    prog_key = {"1": "a", "2": "b", "3": "c", "4": "a", "5": "b", "6": "c", "yt": "a"}.get(variant, "a")
    base = PROGRESSIONS[prog_key]
    prog = [base[i % (len(base) - 1)] for i in range(bars - 1)] + [["Fmaj9"]]

    events = {ch: [] for ch in range(4)}  # ch0 rhodes, ch1 bass, ch2 melody piano, ch3 -> drums(9)

    def note(ch, pitch, start_beat, length, vel):
        p = pitch + (transpose if ch != 3 else 0)
        events[ch].append((beat_ticks(start_beat), "on", p, vel))
        events[ch].append((beat_ticks(start_beat + length), "off", p, 0))

    last_pitch = 72
    for bar, chords in enumerate(prog):
        b0 = bar * 4
        final = bar == bars - 1
        per = 4 / len(chords)
        for ci, name in enumerate(chords):
            voicing, root = CHORDS[name]
            cs = b0 + ci * per
            # --- Rhodes comping
            if final:
                for i, p in enumerate(voicing):
                    note(0, p, cs + i * 0.06, 6, 58)  # gentle roll, long ring
            else:
                pat = COMP_PATTERNS[(bar + ci) % len(COMP_PATTERNS)] if per == 4 else [(0, 1.4, 60), (1 + SWING, 0.4, 50)]
                for off, ln, vel in pat:
                    for p in voicing:
                        note(0, p, cs + off, ln, vel + rnd.randint(-4, 4))
            # --- Bass (two-feel with approach notes)
            if final:
                note(1, root, cs, 6, 78)
            elif per == 4:
                note(1, root, cs, 1.8, 80)
                note(1, root + 7, cs + 2, 1.3, 70)
                note(1, root + (5 if bar % 2 else 10) - 12 + 12, cs + 3 + SWING, 0.3, 62)
            else:
                note(1, root, cs, 1.7, 80)
        # --- Melody: sparse, lyrical; rests in bar 0, resolves on last bar
        if bar == 0:
            note(2, 72, b0 + 3, 0.6, 55)
            note(2, 74, b0 + 3 + SWING, 0.4, 52)
            last_pitch = 74
        elif final:
            note(2, 81, b0, 5, 62)
            note(2, 77, b0 + 0.08, 5, 50)
        else:
            rhythm = rnd.choice([
                [(0, 1.5), (1.5 + SWING - 0.5, 0.5), (2 + SWING, 1.2)],
                [(0, 0.6), (SWING, 0.9), (2, 1.8)],
                [(0.5 + SWING - 0.5, 1.4), (2 + SWING, 0.5), (3, 0.9)],
                [(0, 2.8)],
            ])
            voicing = CHORDS[chords[0]][0]
            for off, ln in rhythm:
                idx = SCALE.index(min(SCALE, key=lambda s: abs(s - last_pitch)))
                idx = max(0, min(len(SCALE) - 1, idx + rnd.choice([-2, -1, -1, 1, 1, 2])))
                p = SCALE[idx]
                # land on a chord tone (octave up) on downbeats for a consonant line
                if off == 0:
                    tones = [v + 12 for v in voicing] + [v + 24 for v in voicing]
                    p = min((t for t in tones if 64 <= t <= 84), key=lambda t: abs(t - p))
                note(2, p, b0 + off, ln, 60 + rnd.randint(-6, 6))
                last_pitch = p
        # --- Brush kit: ride swing pattern, brush snare 2&4, soft kick
        if bar >= 1 and not final:
            for off, vel in [(0, 52), (1, 46), (1 + SWING, 38), (2, 50), (3, 46), (3 + SWING, 38)]:
                note(3, 51, b0 + off, 0.3, vel + rnd.randint(-3, 3))
            note(3, 38, b0 + 1, 0.3, 34)
            note(3, 38, b0 + 3, 0.3, 36)
            note(3, 44, b0 + 1, 0.2, 30)
            note(3, 44, b0 + 3, 0.2, 30)
            note(3, 36, b0, 0.4, 42)
            if bar % 2:
                note(3, 36, b0 + 2 + SWING, 0.3, 30)
        elif final:
            note(3, 51, b0, 2, 50)
            note(3, 53, b0, 2, 40)  # ride bell
            note(3, 36, b0, 0.5, 44)
        elif bar == 0:
            for off in (0, 1, 2, 3):
                note(3, 51, b0 + off, 0.3, 30 + off * 4)  # gentle count-in on ride

    mid = mido.MidiFile(ticks_per_beat=TPB)
    meta = mido.MidiTrack()
    meta.append(mido.MetaMessage("set_tempo", tempo=mido.bpm2tempo(bpm), time=0))
    meta.append(mido.MetaMessage("track_name", name="Key Solutions original score", time=0))
    mid.tracks.append(meta)
    setup = {0: (4, 0, 92), 1: (32, 1, 100), 2: (0, 2, 96), 3: (40, 9, 90)}  # program, channel, volume
    for ch, evs in events.items():
        prog, midi_ch, vol = setup[ch]
        tr = mido.MidiTrack()
        tr.append(mido.Message("program_change", program=prog, channel=midi_ch, time=0))
        tr.append(mido.Message("control_change", control=7, value=vol, channel=midi_ch, time=0))
        tr.append(mido.Message("control_change", control=91, value=70 if ch != 1 else 35, channel=midi_ch, time=0))
        tr.append(mido.Message("control_change", control=10, value={0: 52, 1: 64, 2: 74, 3: 64}[ch], channel=midi_ch, time=0))
        now = 0
        for t, kind, p, v in sorted(evs, key=lambda e: (e[0], e[1] == "on")):
            msg = "note_on" if kind == "on" else "note_off"
            tr.append(mido.Message(msg, note=max(0, min(127, p)), velocity=max(1, min(127, v)) if kind == "on" else 0,
                                   channel=midi_ch, time=t - now))
            now = t
        mid.tracks.append(tr)
    return mid


if __name__ == "__main__":
    variant, bars, bpm, out = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
    transpose = int(sys.argv[5]) if len(sys.argv) > 5 else 0
    build(variant, bars, bpm, transpose).save(out)
    print(f"wrote {out}: {bars} bars @ {bpm} bpm")
