# Key Solutions — AI Automation Intro Video (Remotion)

A 60-second, 1080×1920 (9:16) video at 30 fps, built with Remotion, React and TypeScript.

## Preview

```bash
cd video
npm install
npx remotion studio
```

Open the URL it prints (usually http://localhost:3000).
- `KeySolutionsAIAutomation` is the full 60 s video (1,800 frames).
- `Thumbnail` is the cover image.
- `Scenes/*` lets you preview and edit each scene on its own.

## Render

```bash
npx remotion render KeySolutionsAIAutomation out/key-solutions-ai-automation.mp4 --codec=h264 --crf=18
```

```bash
npx remotion still Thumbnail out/key-solutions-thumbnail.png
```

If Remotion can't download its Chrome build (for example, on a locked-down network), point it at a Chromium you already have:

```bash
REMOTION_CHROME=/path/to/chrome-headless-shell npx remotion render KeySolutionsAIAutomation out/video.mp4
```

## Structure

| Path | What |
|---|---|
| `src/KeySolutionsVideo.tsx` | Main timeline: 6 scenes, 12-frame crossfades, voice-over, music, captions |
| `src/scenes/Scene1Problem.tsx` … `Scene6Offer.tsx` | One file per storyboard scene |
| `src/components/` | Logo, cursor, captions, background, sunset backdrop, icons |
| `src/theme.ts` | Brand colors, fonts, safe zones, scene timings |
| `src/captions.json` | Word-level caption timings (generated) |
| `public/vo/vo1–6.mp3` | Narration, one file per scene |
| `public/music.mp3` | Original music bed, synthesized |
| `public/fonts/` | Poppins and Tinos (OFL), bundled locally |
| `scripts/make_music.py` | Rebuilds the music: `python3 scripts/make_music.py out/music.wav` |
| `scripts/build_captions.py` | Rebuilds the caption JSON and `.srt` from the word timings |

## Timing

| Scene | Frames | Seconds |
|---|---|---|
| 1 Problem | 0–197 | 0.0–6.6 |
| 2 Key Solutions | 198–479 | 6.6–16.0 |
| 3 Real estate demo | 480–827 | 16.0–27.6 |
| 4 Applications | 828–1127 | 27.6–37.6 |
| 5 Pros & cons | 1128–1457 | 37.6–48.6 |
| 6 Offer + CTA | 1458–1799 | 48.6–60.0 |

Scene lengths were adjusted from the storyboard so each one fits its recorded narration line. They still add up to exactly 1,800 frames.

## Safe zones

All key content stays inside x 60–1020 and y 150–1750. The band from y 1490 to 1660 is kept clear for captions. Text sizes never go below 56 px for headlines, 36 px for body text and 28 px for labels; captions are 50 px.

## Changing prices or copy

Prices are in `src/scenes/Scene6Offer.tsx` (`OFFERS`). If you change any spoken line, regenerate that line's voice-over, update its word timings in `scripts/build_captions.py`, and run that script again.
