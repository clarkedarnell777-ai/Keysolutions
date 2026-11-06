# Key Solutions — AI Automation Intro Video (Storyboard v1, for approval)

**Spec:** 1080×1920 · 30 fps · 1,800 frames (60.0 s) · H.264 MP4 · 9:16
**Safe area:** x 60–1020, y 150–1750 (960 × 1600 px). Font minimums: headline 56, body 36, label 28, caption 36.
**Brand (from owner-supplied banner `video-plan/assets/brand-banner.png`):**
- Wordmark: gold key icon + "Key Solutions" in a classic high-contrast serif (recreated with **Tinos**, Times-metric, OFL) with a thin gold rule underneath.
- Eyebrow labels: gold, bold, wide letter-spacing, all caps (e.g. "REAL ESTATE SOLUTIONS · AI AUTOMATION").
- Body/UI/captions: **Poppins** (OFL), which matches the banner's sans text. It replaces Inter.
- Mood: Florida dusk: navy sky fading into a warm sunset glow. Scene backgrounds use the navy gradient; the final scene reuses the sunset horizon.
**Palette (sampled from banner):** Night navy `#151C35` · Navy `#242E55` · Water navy `#283760` · **Key gold `#D8B66A`** (primary accent: highlights, active caption word, CTA) · Cream `#F4F1E8` (headlines) · Mist `#D9DCEA` (body) · Sunset glow `#F5D08C` · Dusk mauve `#80606D` · Sand `#B48F57`.
Functional colors: benefit check `#3CC48F` (green); limitation icon `#E8A33D` amber, outlined so it reads differently from brand gold; UI-mock surfaces `#FFFFFF`/`#F3F4F8` with navy text for the Sheets/Gmail-style cards.
Electric blue is dropped; gold is the accent throughout.
**Framework:** Problem → Solution → Demonstration → Applications → Honest Evaluation → CTA

---

## Research status

| Item | Status | Source |
|---|---|---|
| `/ai-automation` page text | **Verified** from page text supplied by owner (host itself is blocked in this session) | keysolutionsfl.com/ai-automation, 2026-11-06 |
| Logo, brand colors, fonts, site images | **Not found** (no images in Google Drive) | — |
| Business positioning | Found | Owner's brief, Gmail, 2026-10-02 |
| AI Automation Audit — **$95 one time**: review of repetitive processes + written recommendations | **Verified on page** | /ai-automation |
| AI + Google Apps Script integration — **$777 one time**: one agreed workflow, built & configured in client's Google account. Larger/additional projects quoted separately → use "one time", **not** "starting at" | **Verified on page** | /ai-automation |
| Maintenance — **$99 per month**: monitoring, troubleshooting, minor adjustments (optional) | **Verified on page** | /ai-automation |
| Free 10-minute intro call | **Verified on page** | /ai-automation |
| "No per-user fees"; runs inside the client's own Google account | **Verified on page** | /ai-automation |
| Audit scope | Reviews lead mgmt, follow-up, email, spreadsheet & admin processes → written list of what could be automated and how | /ai-automation |
| Contact URL | `https://keysolutionsfl.com/ai-automation` (given by owner) | Chat |
| Google Apps Script quotas & capabilities | From prior knowledge — **must verify** against developers.google.com (host blocked) | — |

---

## Scene timeline

| # | Scene | Seconds | Frames |
|---|---|---|---|
| 1 | The Business Problem | 0–7 | 0–209 |
| 2 | Introducing Key Solutions | 7–15 | 210–449 |
| 3 | Real Estate Demo | 15–27 | 450–809 |
| 4 | Small Business Applications | 27–38 | 810–1139 |
| 5 | Pros & Cons | 38–51 | 1140–1529 |
| 6 | Offer + CTA | 51–60 | 1530–1799 |

Scene transitions: 12-frame crossfades via `@remotion/transitions` (`fade()`), with the
TransitionSeries durations adjusted so the total is exactly 1,800 frames.

---

## Scene 1 — The Business Problem (0–7 s)

- **Headline (64px, bold, white):** "Still Paying for Repetitive Work?" — springs in by frame 15 (hook inside 1 s).
- **Visual:** Illustrated (vector/React) agent avatar at a phone-sized "task board". Notification cards stack from the bottom with spring + slight rotation, one every ~12 frames:
  - "3 new leads — no reply yet" · "Update listing spreadsheet" · "Follow-up email overdue" · "Reschedule showing 2:30 PM" · "Copy form data into CRM"
- An unread counter climbs 0 → 27 with `interpolate()`; the cards jitter slightly as the pile grows.
- **Out (f180–209):** cards snap into a single straight line that becomes a glowing connector line → transition into Scene 2 workflow.
- **VO:** "How much time does your business lose to follow-ups, spreadsheets, and repetitive tasks?"

## Scene 2 — Introducing Key Solutions (7–15 s)

- **Logo:** Key Solutions logo springs in (scale 0.6 → 1, damping 12). *Gold key icon + serif "Key Solutions" wordmark + thin gold rule, matching the banner.*
- **Headline:** "Meet Smarter Business Automation"
- **Sub (40px):** "AI + Google Apps Script + Your Existing Tools"
- **Tool chips (28px):** Sheets · Gmail · Forms · Calendar (matches the site's list)
- **Workflow (vertical, mobile-friendly):** Google Sheets → Apps Script → AI → Gmail → Lead Tracker. Nodes stagger in (8-frame offsets); SVG connector lines draw with `strokeDashoffset`; a glowing pulse dot travels down the chain.
- **Label (28px):** "Tailored to your actual business process"
- **Logos:** Generic icons + text names (not official Google logos — see Licensing). Footnote: "Google Sheets, Gmail and Apps Script are trademarks of Google LLC. Key Solutions is not affiliated with Google."
- **VO:** "Key Solutions connects AI with tools like Google Sheets, Gmail, and Apps Script to automate everyday workflows — built around how you already work."

## Scene 3 — Real Estate Demo (15–27 s)

- **Headline:** "See How a Lead Becomes a Follow-Up"
- **Label (28px, persistent, bottom of safe zone):** "Simulated workflow — actual setup varies."
- **UI:** Large, simplified *Sheets-style* card (not a Google UI clone), 960px wide. Because 7 columns can't be legible at 9:16, the sheet shows **3 columns** in the grid (Lead Name · Inquiry Type · Follow-Up Status) and the selected row expands into a **detail card** with all 7 fields:
  - Lead Name: *Jordan Rivera* (fictional) · Inquiry Type: *Buyer — showing request* · Property Interest: *3BR condo, waterfront* · Email: *jordan@example.com* · Follow-Up Status · Last Contact · Next Action
- **Beats (frames relative to scene start):**
  1. f0–50 — New row slides in at top of sheet, highlighted blue, status chip "NEW".
  2. f50–90 — Badge "Apps Script: new row detected" with a small spinning gear; status → "PROCESSING".
  3. f90–170 — Cursor (12px white circle, soft glow trail) eases to the row, click ripple, detail card expands. AI draft panel types out (typewriter via frame-based substring):
     > "Hi Jordan, thanks for asking about the waterfront condo. I'd be glad to set up a showing. Would Thursday afternoon or Saturday morning work for you?"
     Label above the draft: "AI draft — needs your review".
  4. f170–260 — Cursor moves (bezier-eased, no teleporting) to "Approve & Send" button; hover state, click ripple.
  5. f260–310 — Gmail-*style* "Sent" toast (envelope icon + "Email sent").
  6. f310–359 — Row updates: Status "CONTACTED" (green), Last Contact "Today", Next Action "Follow up in 2 days".
- **VO:** "When a lead comes in, automation can organize the inquiry, draft a response, and track follow-ups — while you stay in control."

## Scene 4 — Not Just for Real Estate (27–38 s)

- **Headline:** "Not Just for Real Estate"
- **Three stacked cards** (staggered spring, ~3.5 s of focus each, active card scales up / others dim):
  - **A — Service company (HVAC/plumbing):** "New service request" → logged in sheet → "Acknowledgment sent" chip. Label: "After setup & testing".
  - **B — Professional services:** "Consultation inquiry" → AI draft → 3 suggested time-slot chips pulled from a calendar mini-view (Tue 10:00 · Wed 2:00 · Thu 11:30).
  - **C — Small business ops:** 4 inbound messages fan in → sorted into category tags (Quote · Support · Billing · Urgent) → one row flagged amber "Needs attention".
- **VO (revised — see Notes):** "From service requests to scheduling and customer follow-ups, one well-designed workflow can take a lot of repetitive admin off your plate."

## Scene 5 — Powerful Automation. Real Trade-Offs. (38–51 s)

- **Headline:** "Powerful Automation. Real Trade-Offs."
- **Layout:** On 9:16 a side-by-side split would force ~30px text, so this is a **stacked split**: Benefits panel (top), Limitations panel (bottom), with a thin divider. Items stagger in at ~14-frame intervals; benefits first, then limitations.
- **Benefits (blue check icons):**
  - Less repetitive data entry
  - Faster lead organization
  - More consistent follow-up
  - Potentially lower admin costs
  - Works with your Google Workspace tools
- **Limitations (amber caution icons, neutral not alarming):**
  - Setup and testing required
  - AI can make mistakes
  - API and software costs may apply
  - Apps Script has quotas and run-time limits
  - Human oversight and data security still matter
- **VO:** "Automation can save time and reduce manual work. But it still needs setup, monitoring, and human judgment. AI isn't perfect."

## Scene 6 — Offer + CTA (51–60 s)

- **Background:** the brand's Florida dusk scene (navy sky → sunset glow over water, palm and skyline silhouettes, rebuilt as SVG from the banner) with a blurred, dimmed Scene 3 dashboard floating above it.
- **Headline:** "Find Out What You Can Automate"
- **Offer cards (stagger):**
  - **AI Automation Audit — $95 one time** · "Written recommendations" (highlighted, "Start here" tag)
  - **AI + Apps Script Integration — $777 one time** · "One agreed workflow, built & tested"
  - **Maintenance — $99/month (optional)** · "Monitoring & minor adjustments"
- **Small line above cards (28px):** "Free 10-minute intro call"
- **Label (28px):** "Larger projects quoted separately. No guarantee of leads or revenue."
- **CTA button (pulsing glow):** "Explore Your Automation Opportunities"
- **URL (48px):** keysolutionsfl.com
- **Out (f240–269):** logo scales slightly and fades to navy.
- **VO (trimmed to fit 9 s):** "Start with a Key Solutions automation audit. See what you can simplify — and where automation actually makes financial sense."

---

## Full voiceover script (≈128 words ≈ 130 wpm over 60 s)

| Time | Line |
|---|---|
| 0.3–5.5 | How much time does your business lose to follow-ups, spreadsheets, and repetitive tasks? |
| 7.3–14.5 | Key Solutions connects AI with tools like Google Sheets, Gmail, and Apps Script to automate everyday workflows — built around how you already work. |
| 15.5–25.5 | When a lead comes in, automation can organize the inquiry, draft a response, and track follow-ups — while you stay in control. |
| 27.5–36.5 | From service requests to scheduling and customer follow-ups, one well-designed workflow can take a lot of repetitive admin off your plate. |
| 38.5–49.5 | Automation can save time and reduce manual work. But it still needs setup, monitoring, and human judgment. AI isn't perfect. |
| 51.5–58.5 | Start with a Key Solutions automation audit. See what you can simplify — and where automation actually makes financial sense. |

Captions: burned in, 40px Poppins SemiBold, white on 70% navy pill, 2–4 words per page with the active word in key gold; positioned y ≈ 1450–1600 (inside the bottom safe zone, below the main UI). Timings come from the real narration (transcribed with `@remotion/install-whisper-cpp`), and the same data exports the `.srt`.

---

## Factual claims used in the video

| On-screen / VO claim | Basis | Status |
|---|---|---|
| Apps Script connects Google Workspace services (Sheets, Gmail, Calendar, Forms) and can call external APIs (UrlFetchApp) | Google Apps Script docs | Verify once developers.google.com is reachable |
| Apps Script can react to new form submissions / sheet edits with triggers | Apps Script installable triggers docs | Verify |
| Apps Script has quotas and execution limits (e.g. per-execution run time, daily email recipients, daily URL Fetch calls, which differ between consumer and Workspace accounts) | Apps Script quotas page | Verify; video states this only generally, no numbers |
| Calendar data can be read to suggest open slots | CalendarApp / Calendar API docs | Verify |
| AI can make mistakes; human review recommended | General / provider guidance | Safe, qualitative |
| API usage costs may apply | AI provider pricing pages | Safe, qualitative |
| Prices $95 one time / $777 one time / $99 per month; free 10-min intro call | /ai-automation page | Verified 2026-11-06 |

No testimonials, client results, savings %, time-saved figures, certifications or guarantees are used.

---

## Assets & licensing plan

| Asset | Plan |
|---|---|
| Key Solutions logo | Rebuilt as a vector from the owner-supplied banner: an SVG gold key plus the serif wordmark. The banner is kept in `video-plan/assets/`. The sunset/skyline art is a possible Scene 6 backdrop (owner's own asset). |
| Website images/screenshots | None obtained. All UI is illustrative React components (Sheets-*style*, Gmail-*style*), clearly not real accounts. |
| Google product logos | **Not used.** Google's brand terms limit third-party marketing use of its logos; we use neutral icons + product names and a trademark footnote. |
| People | Simple illustrated avatar (no stock photos, no real people). |
| Voiceover | Generate with the **Speko** connector's speech synthesis (an authorized TTS service on your account) using a clear, confident American English voice — or your own recorded VO. |
| Music | Original, procedurally generated soft electronic bed (synth pad + light pulse) made in this session, mixed at ~−22 dB under VO — no third-party tracks. |
| Fonts | Tinos + Poppins via `@remotion/google-fonts` (SIL Open Font License). |
