"""Build caption JSON (Remotion Caption[]) and an .srt from the narration word timings.

Word timings come from transcribing each synthesized voice-over line
(Speko audio.transcribe, word_timestamps=true). Word text is taken from the
approved script so spelling/brand names are exact; counts are identical.
Usage: python3 scripts/build_captions.py src/captions.json ../deliverables/key-solutions-ai-automation.srt
"""
import json, sys, re

FPS = 30
SCENE_FRAMES = [198, 282, 348, 300, 330, 342]
VO_OFFSETS = [0, 6, 6, 6, 6, 6]
starts = [sum(SCENE_FRAMES[:i]) for i in range(6)]

SCRIPT = [
    "How much time does your business lose to follow-ups, spreadsheets, and repetitive tasks?",
    "Key Solutions connects AI with tools like Google Sheets, Gmail, and Apps Script to automate everyday workflows, built around how you already work.",
    "When a lead comes in, automation can organize the inquiry, draft a response, and track follow-ups, while you stay in control.",
    "From service requests to scheduling and customer follow-ups, one well-designed workflow can take a lot of repetitive admin off your plate.",
    "Automation can save time and reduce manual work. But it still needs setup, monitoring, and human judgment. AI isn't perfect.",
    "Start with a Key Solutions automation audit. See what you can simplify, and where automation actually makes financial sense.",
]
# (start_ms, end_ms) per word, from the transcription of each line's audio file
T = [
    [(400,500),(500,700),(700,1000),(1000,1200),(1200,1300),(1300,1800),(1800,2300),(2300,2400),(2400,3300),(3400,4400),(4700,4800),(4800,5400),(5400,6100)],
    [(400,500),(500,1000),(1000,1400),(1400,1700),(1700,1900),(1900,2200),(2200,2400),(2400,2800),(2800,3300),(3400,4200),(4300,4500),(4500,4600),(4600,5200),(5200,5300),(5300,5700),(5700,6200),(6200,7100),(7300,7500),(7500,7800),(7800,8000),(8000,8200),(8200,8600),(8600,8800)],
    [(100,300),(300,400),(400,800),(800,1000),(1000,1400),(1800,2500),(2500,2800),(2800,3400),(3400,3500),(3500,4300),(4600,5000),(5000,5100),(5100,6000),(6100,6300),(6300,6800),(6800,7500),(7900,8100),(8100,8400),(8400,8700),(8700,8800),(8800,9400)],
    [(100,300),(300,700),(700,1300),(1300,1500),(1500,2200),(2200,2400),(2400,2900),(2900,3600),(4000,4300),(4300,5100),(5100,5700),(5700,5900),(5900,6200),(6200,6200),(6200,6600),(6600,6700),(6700,7300),(7300,7700),(7700,7900),(7900,8100),(8100,8400)],
    [(100,700),(700,900),(900,1200),(1200,1600),(1600,1700),(1700,2100),(2100,2600),(2600,3000),(3600,3700),(3700,3800),(3800,4000),(4000,4400),(4400,4900),(4900,5600),(5600,5700),(5700,6000),(6000,6600),(7200,7600),(7600,7900),(7900,8300)],
    [(100,600),(600,800),(800,900),(900,1300),(1300,2100),(2100,2800),(2900,3100),(3900,4100),(4100,4300),(4300,4400),(4400,4600),(4600,5500),(5700,5900),(5900,6300),(6300,7100),(7100,7600),(7600,8000),(8000,8600),(8600,9200)],
]

captions = []
for i, (line, times) in enumerate(zip(SCRIPT, T)):
    words = line.split(" ")
    assert len(words) == len(times), (i, len(words), len(times))
    base = (starts[i] + VO_OFFSETS[i]) / FPS * 1000
    for w, (s, e) in zip(words, times):
        e = max(e, s + 80)
        captions.append({"text": w, "startMs": round(base + s), "endMs": round(base + e), "timestampMs": round(base + (s + e) / 2), "confidence": None, "line": i})

# Pages for on-screen captions: max 3 words / 20 chars, break after punctuation
pages, cur = [], []
for c in captions:
    if cur and (cur[-1]["line"] != c["line"] or len(cur) >= 3 or len(" ".join(x["text"] for x in cur + [c])) > 20):
        pages.append(cur); cur = []
    cur.append(c)
    if re.search(r"[,.?]$", c["text"]):
        pages.append(cur); cur = []
if cur: pages.append(cur)

out_pages = []
for k, p in enumerate(pages):
    start = p[0]["startMs"]
    nxt = pages[k + 1][0]["startMs"] if k + 1 < len(pages) else p[-1]["endMs"] + 600
    end = min(nxt, p[-1]["endMs"] + 600)
    out_pages.append({"startMs": start, "endMs": end, "words": [{"text": w["text"], "startMs": w["startMs"], "endMs": w["endMs"]} for w in p]})

with open(sys.argv[1], "w") as f:
    json.dump({"words": [{k: v for k, v in c.items() if k != "line"} for c in captions], "pages": out_pages}, f, indent=1)

# SRT: one cue per sentence/clause chunk (max ~7 words) for readability
def ts(ms):
    h, ms = divmod(int(ms), 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
cues, cur = [], []
for c in captions:
    if cur and (cur[-1]["line"] != c["line"] or len(cur) >= 7):
        cues.append(cur); cur = []
    cur.append(c)
    if re.search(r"[.?]$", c["text"]) or (re.search(r",$", c["text"]) and len(cur) >= 4):
        cues.append(cur); cur = []
if cur: cues.append(cur)
with open(sys.argv[2], "w") as f:
    for n, q in enumerate(cues, 1):
        end = q[-1]['endMs'] + 250
        if n < len(cues):
            end = min(end, cues[n][0]['startMs'] - 1)
        f.write(f"{n}\n{ts(q[0]['startMs'])} --> {ts(end)}\n{' '.join(x['text'] for x in q)}\n\n")
print(len(captions), "words,", len(out_pages), "pages,", len(cues), "srt cues")
