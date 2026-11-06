"""Generate an original, royalty-free corporate electronic music bed (60 s).

Pure synthesis with numpy — no samples or third-party audio.
Usage: python3 scripts/make_music.py public/music.wav
"""
import sys, wave
import numpy as np

SR = 48000
DUR = 60.0
BPM = 100
BEAT = 60 / BPM
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)

def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)

# vi - IV - I - V in C major, 2 bars (8 beats) per chord
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 55, 60, 64], [55, 59, 62]]
BASS = [45, 41, 36, 43]
CHORD_LEN = 8 * BEAT

L = np.zeros(N); R = np.zeros(N)

def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    na = min(na, n); nr = min(nr, n - na)
    e[:na] = np.linspace(0, 1, na)
    if nr > 0:
        e[n - nr:] = np.linspace(1, 0, nr)
    return e

def add(buf, start, sig):
    s = int(start * SR)
    if s >= N: return
    e = min(N, s + len(sig))
    buf[s:e] += sig[: e - s]

# --- Pad: soft detuned additive tones, slow swell
k = 0; pos = 0.0
while pos < DUR:
    ch = CHORDS[k % 4]
    n = int(CHORD_LEN * SR) + int(0.8 * SR)
    tt = np.arange(n) / SR
    for i, m in enumerate(ch):
        f = midi(m)
        for det, pan in ((-0.12, 0.25), (0.12, 0.75)):
            ff = f * 2 ** (det / 12)
            sig = (np.sin(2*np.pi*ff*tt) + 0.35*np.sin(2*np.pi*2*ff*tt) + 0.12*np.sin(2*np.pi*3*ff*tt))
            sig *= env_adsr(n, 1.2, 1.2) * 0.045
            add(L, pos, sig * (1 - pan)); add(R, pos, sig * pan)
    # sub bass, whole notes on beats 1 and 5
    for b in (0, 4):
        nb = int(3.6 * BEAT * SR); tb = np.arange(nb) / SR
        fb = midi(BASS[k % 4])
        sig = np.sin(2*np.pi*fb*tb) * np.exp(-tb * 0.9) * env_adsr(nb, 0.02, 0.3) * 0.16
        add(L, pos + b * BEAT, sig); add(R, pos + b * BEAT, sig)
    # arpeggio pluck in 8th notes (enters after 4 s)
    arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 24 if len(ch) < 4 else ch[3] + 12]
    for s in range(16):
        st = pos + s * BEAT / 2
        if st < 4.0: continue
        f = midi(arp[s % 4])
        npk = int(0.45 * SR); tp = np.arange(npk) / SR
        sig = (np.sin(2*np.pi*f*tp) + 0.25*np.sin(2*np.pi*2*f*tp)) * np.exp(-tp * 9) * env_adsr(npk, 0.004, 0.05) * 0.05
        pan = 0.35 if s % 2 == 0 else 0.65
        add(L, st, sig * (1 - pan)); add(R, st, sig * pan)
    pos += CHORD_LEN; k += 1

# --- Light percussion: soft kick on beats, filtered hat on off-beats (from 8 s)
nbeats = int(DUR / BEAT)
for b in range(nbeats):
    st = b * BEAT
    if st >= 8.0 and st < 56.0:
        nk = int(0.25 * SR); tk = np.arange(nk) / SR
        f = 90 * np.exp(-tk * 18) + 45
        kick = np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-tk * 14) * 0.13
        add(L, st, kick); add(R, st, kick)
    if st >= 8.0 and st < 57.0:
        nh = int(0.06 * SR)
        noise = rng.standard_normal(nh)
        noise = np.diff(np.concatenate([[0], noise]))  # crude high-pass
        hat = noise * np.exp(-np.arange(nh) / SR * 70) * 0.018
        add(L, st + BEAT / 2, hat * 0.8); add(R, st + BEAT / 2, hat)

# --- Gentle echo for space
d = int(BEAT * 0.75 * SR)
for buf in (L, R):
    echo = np.zeros(N); echo[d:] = buf[:-d] * 0.22
    buf += echo

# master fades
fade = np.ones(N)
fade[: int(2.0 * SR)] = np.linspace(0, 1, int(2.0 * SR))
fade[-int(3.0 * SR):] = np.linspace(1, 0, int(3.0 * SR))
L *= fade; R *= fade
peak = max(np.abs(L).max(), np.abs(R).max())
L, R = L / peak * 0.85, R / peak * 0.85

out = np.stack([L, R], axis=1)
pcm = (out * 32767).astype(np.int16)
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", sys.argv[1])
