import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, springIn, typewriter } from "../anim";
import { Background } from "../components/Background";
import { Cursor } from "../components/Cursor";
import { CheckIcon, GearIcon, SheetIcon, SparkleIcon } from "../components/Icons";
import { SceneTitle } from "../components/SceneTitle";
import { SmallLabel } from "../components/SmallLabel";
import { C, SAFE, SANS } from "../theme";

// ---- Timeline (scene-local frames) ----
const T = {
  rowIn: 14,
  processing: 52,
  cursorIn: 66,
  rowClick: 100,
  panelIn: 104,
  typeStart: 128,
  draftReady: 196,
  approveClick: 246,
  sent: 250,
  updated: 262,
};

const DRAFT =
  "Hi Jordan, thanks for asking about the waterfront condo. Would Thursday afternoon or Saturday morning work for a showing?";

// ---- Layout ----
const SHEET_TOP = 380;
const HEAD_H = 64;
const COLS_H = 50;
const ROW_H = 76;
const ROWS_TOP = SHEET_TOP + HEAD_H + COLS_H;
const BADGE_TOP = ROWS_TOP + ROW_H * 3 + 16;
const PANEL_TOP = BADGE_TOP + 78;
const COL_W = [370, 250, 340];

type Status = { label: string; bg: string; fg: string };
const S_NEW: Status = { label: "NEW", bg: "#FBF1DA", fg: "#9A7420" };
const S_PROC: Status = { label: "PROCESSING", bg: "#E3ECFD", fg: "#2F5BB7" };
const S_DRAFT: Status = { label: "DRAFT READY", bg: "#F1E7EC", fg: "#7A4F62" };
const S_DONE: Status = { label: "CONTACTED", bg: "#DDF5EA", fg: "#1D8A5B" };
const S_FU: Status = { label: "FOLLOW-UP", bg: "#FBF1DA", fg: "#9A7420" };

const Chip: React.FC<{ s: Status; pop?: number }> = ({ s, pop = 1 }) => (
  <span
    style={{
      display: "inline-block",
      padding: "6px 16px",
      borderRadius: 20,
      background: s.bg,
      color: s.fg,
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: 0.5,
      scale: pop,
    }}
  >
    {s.label}
  </span>
);

const Row: React.FC<{ cells: [string, string]; status: Status; highlight?: number; pop?: number; style?: React.CSSProperties }> = ({
  cells,
  status,
  highlight = 0,
  pop = 1,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      height: ROW_H,
      display: "flex",
      alignItems: "center",
      borderBottom: `2px solid ${C.line}`,
      background: `rgba(216,182,106,${0.18 * highlight})`,
      boxShadow: highlight > 0.5 ? `inset 6px 0 0 ${C.gold}` : undefined,
      ...style,
    }}
  >
    <div style={{ width: COL_W[0], paddingLeft: 28, fontSize: 36, fontWeight: 600, color: C.ink, whiteSpace: "nowrap" }}>{cells[0]}</div>
    <div style={{ width: COL_W[1], fontSize: 36, color: C.ink }}>{cells[1]}</div>
    <div style={{ width: COL_W[2] }}>
      <Chip s={status} pop={pop} />
    </div>
  </div>
);

const Field: React.FC<{ label: string; value: string; flash?: number }> = ({ label, value, flash = 0 }) => (
  <div>
    <div style={{ fontSize: 28, color: C.muted, fontWeight: 500 }}>{label}</div>
    <div
      style={{
        fontSize: 36,
        color: flash > 0 ? "#1D8A5B" : C.ink,
        fontWeight: 600,
        whiteSpace: "nowrap",
        background: `rgba(60,196,143,${0.18 * flash})`,
        borderRadius: 8,
        marginLeft: -6,
        paddingLeft: 6,
      }}
    >
      {value}
    </div>
  </div>
);

export const Scene3Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sheet = springIn(frame, fps, 4, { damping: 200 });
  const rowIn = springIn(frame, fps, T.rowIn, { damping: 16, stiffness: 140 });
  const panel = springIn(frame, fps, T.panelIn, { damping: 15, stiffness: 120 });
  const badge = springIn(frame, fps, T.processing - 6, { damping: 200 });

  const status =
    frame >= T.updated ? S_DONE : frame >= T.draftReady ? S_DRAFT : frame >= T.processing ? S_PROC : S_NEW;
  const statusChange = [T.processing, T.draftReady, T.updated].filter((f) => frame >= f).pop() ?? T.rowIn;
  const pop = interpolate(frame - statusChange, [0, 5, 12], [0.8, 1.12, 1], clamp);
  const rowHighlight =
    frame >= T.rowClick ? 1 : interpolate(frame, [T.rowIn, T.rowIn + 10, T.rowIn + 40], [0, 1, 0.4], clamp);
  const updatedFlash = interpolate(frame, [T.updated, T.updated + 6, T.updated + 40], [0, 1, 0.35], clamp);

  const badgeText =
    frame >= T.sent
      ? "Sent via Gmail · lead status updated"
      : frame >= T.draftReady
        ? "Draft ready — waiting for your approval"
        : frame >= T.typeStart - 8
          ? "AI is drafting a personalized reply…"
          : "Apps Script: new lead row detected";
  const badgeDone = frame >= T.sent;

  const typed = typewriter(DRAFT, frame, T.typeStart, DRAFT.length / (T.draftReady - T.typeStart - 4));
  const caretOn = frame < T.draftReady && Math.floor(frame / 8) % 2 === 0;

  const btnHover = frame >= T.approveClick - 14 && frame < T.sent;
  const btnPress = frame >= T.approveClick && frame < T.approveClick + 5;
  const sentS = springIn(frame, fps, T.sent, { damping: 12, stiffness: 160 });

  const BTN_Y = PANEL_TOP + 594;

  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Background />
      <SceneTitle eyebrow="Real Estate Demo" title={<>See How a Lead<br />Becomes a Follow-Up</>} size={60} />

      {/* Sheets-style lead tracker (illustrative, not Google's UI) */}
      <div
        style={{
          position: "absolute",
          top: SHEET_TOP,
          left: SAFE.left,
          width: SAFE.width,
          height: HEAD_H + COLS_H + ROW_H * 3,
          borderRadius: 24,
          overflow: "hidden",
          background: C.surface,
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          opacity: sheet,
          translate: `0px ${interpolate(sheet, [0, 1], [50, 0])}px`,
        }}
      >
        <div
          style={{
            height: HEAD_H,
            background: "#1E8E5A",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 26px",
            color: "white",
          }}
        >
          <SheetIcon size={38} color="white" />
          <div style={{ fontSize: 32, fontWeight: 600 }}>Lead Tracker</div>
          <div style={{ marginLeft: "auto", fontSize: 28, opacity: 0.9 }}>Sample data</div>
        </div>
        <div
          style={{
            height: COLS_H,
            display: "flex",
            alignItems: "center",
            background: C.surface2,
            borderBottom: `2px solid ${C.line}`,
            fontSize: 28,
            fontWeight: 600,
            color: C.muted,
          }}
        >
          <div style={{ width: COL_W[0], paddingLeft: 28 }}>Lead Name</div>
          <div style={{ width: COL_W[1] }}>Inquiry</div>
          <div style={{ width: COL_W[2] }}>Follow-Up Status</div>
        </div>
        <div style={{ position: "relative", height: ROW_H * 3 }}>
          <Row cells={["Maria Chen", "Seller"]} status={S_DONE} style={{ top: rowIn * ROW_H }} />
          <Row cells={["Devon Price", "Rental"]} status={S_FU} style={{ top: ROW_H + rowIn * ROW_H }} />
          <Row
            cells={["Jordan Rivera", "Buyer"]}
            status={status}
            pop={pop}
            highlight={rowHighlight}
            style={{
              top: 0,
              opacity: rowIn,
              translate: `${interpolate(rowIn, [0, 1], [-200, 0])}px 0px`,
              background: `rgba(216,182,106,${0.18 * rowHighlight})`,
            }}
          />
        </div>
      </div>

      {/* Automation status badge */}
      <div
        style={{
          position: "absolute",
          top: BADGE_TOP,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: badge,
          scale: interpolate(badge, [0, 1], [0.85, 1]),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 28px",
            borderRadius: 40,
            background: badgeDone ? "rgba(60,196,143,0.18)" : "rgba(216,182,106,0.16)",
            border: `2px solid ${badgeDone ? C.green : C.gold}`,
            color: C.cream,
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          {badgeDone ? (
            <CheckIcon size={34} color={C.green} />
          ) : frame >= T.typeStart - 8 && frame < T.draftReady ? (
            <SparkleIcon size={34} color={C.gold} />
          ) : (
            <div style={{ rotate: `${frame * 6}deg`, display: "flex" }}>
              <GearIcon size={34} color={C.gold} />
            </div>
          )}
          {badgeText}
        </div>
      </div>

      {/* Lead record + AI draft + approval */}
      <div
        style={{
          position: "absolute",
          top: PANEL_TOP,
          left: SAFE.left,
          width: SAFE.width,
          height: 664,
          borderRadius: 28,
          background: C.surface,
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          padding: "26px 34px",
          boxSizing: "border-box",
          opacity: panel,
          scale: interpolate(panel, [0, 1], [0.9, 1]),
          translate: `0px ${interpolate(panel, [0, 1], [80, 0])}px`,
          transformOrigin: "50% 0%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ fontSize: 42, fontWeight: 700, color: C.ink }}>Jordan Rivera</div>
          <span
            style={{
              padding: "4px 14px",
              borderRadius: 14,
              background: C.surface2,
              color: C.muted,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            Buyer inquiry
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 14, columnGap: 20, marginTop: 14 }}>
          <Field label="Property Interest" value="3BR waterfront condo" />
          <Field label="Email" value="jordan@example.com" />
          <Field label="Last Contact" value={frame >= T.updated ? "Today" : "—"} flash={updatedFlash} />
          <Field label="Next Action" value={frame >= T.updated ? "Follow up in 2 days" : "Send reply"} flash={updatedFlash} />
        </div>

        <div
          style={{
            marginTop: 18,
            borderRadius: 18,
            border: `2px dashed ${frame >= T.draftReady ? C.gold : C.line}`,
            background: "#FBF8F1",
            padding: "14px 20px",
            height: 228,
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 28, fontWeight: 700, color: "#9A7420" }}>
            <SparkleIcon size={28} color="#9A7420" />
            AI draft — needs your review
          </div>
          <div style={{ marginTop: 6, fontSize: 36, lineHeight: 1.3, color: C.ink }}>
            {typed}
            {caretOn ? <span style={{ color: C.gold }}>|</span> : null}
          </div>
        </div>
      </div>

      {/* Approve & Send button (positioned absolutely so the cursor target is exact) */}
      <div
        style={{
          position: "absolute",
          top: BTN_Y - 44,
          left: SAFE.left + 34,
          width: SAFE.width - 68,
          height: 88,
          borderRadius: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          fontSize: 38,
          fontWeight: 700,
          color: frame >= T.sent ? "white" : C.night,
          background: frame >= T.sent ? C.green : btnHover ? C.glow : C.gold,
          boxShadow: btnHover ? `0 0 30px rgba(245,208,140,0.8)` : "0 8px 20px rgba(0,0,0,0.25)",
          opacity: panel * interpolate(frame, [T.draftReady - 10, T.draftReady + 4], [0.35, 1], clamp),
          scale: btnPress ? 0.96 : frame >= T.sent ? interpolate(sentS, [0, 1], [0.9, 1]) : 1,
        }}
      >
        {frame >= T.sent ? (
          <>
            <CheckIcon size={40} color="white" /> Sent — status updated
          </>
        ) : (
          "Approve & Send"
        )}
      </div>

      <Cursor
        appearAt={T.cursorIn}
        hideAt={T.updated + 30}
        clicks={[T.rowClick, T.approveClick]}
        keys={[
          { f: T.cursorIn, x: 880, y: 1240 },
          { f: T.rowClick - 2, x: 250, y: ROWS_TOP + ROW_H / 2 },
          { f: T.typeStart + 20, x: 330, y: ROWS_TOP + ROW_H * 1.4 },
          { f: T.draftReady, x: 760, y: PANEL_TOP + 360 },
          { f: T.approveClick - 4, x: 540, y: BTN_Y },
          { f: T.updated + 30, x: 600, y: BTN_Y + 30 },
        ]}
      />

      <SmallLabel>Simulated workflow — actual setup varies.</SmallLabel>
    </AbsoluteFill>
  );
};
