import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, springIn } from "../anim";
import { Background } from "../components/Background";
import { CalendarIcon, ClockIcon, CopyIcon, MailIcon, PersonIcon, SheetIcon } from "../components/Icons";
import { SceneTitle } from "../components/SceneTitle";
import { C, SAFE, SANS } from "../theme";

const TASKS = [
  { icon: MailIcon, text: "3 new leads — no reply yet", time: "8:02 AM", urgent: true },
  { icon: SheetIcon, text: "Update listing spreadsheet", time: "9:15 AM", urgent: false },
  { icon: ClockIcon, text: "Follow-up email overdue", time: "10:40 AM", urgent: true },
  { icon: CalendarIcon, text: "Reschedule showing 2:30 PM", time: "11:05 AM", urgent: false },
  { icon: CopyIcon, text: "Copy form data into CRM", time: "12:20 PM", urgent: false },
];

const BOARD_TOP = 470;
const CARD_H = 132;
const GAP = 22;

export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const board = springIn(frame, fps, 6, { damping: 200 });
  const count = Math.round(interpolate(frame, [20, 150], [0, 27], clamp));
  const shake = interpolate(frame, [100, 165], [0, 1], clamp);
  // Exit: cards collapse into a single gold line (hand-off to the workflow scene)
  const collapse = interpolate(frame, [168, 192], [0, 1], { ...clamp, easing: (t) => t * t });
  const lineW = interpolate(frame, [176, 198], [0, SAFE.width], clamp);

  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Background />
      <SceneTitle eyebrow="The Problem" title={<>Still Paying for<br />Repetitive Work?</>} size={72} />

      <div
        style={{
          position: "absolute",
          top: BOARD_TOP,
          left: SAFE.left,
          width: SAFE.width,
          opacity: board * (1 - collapse),
          translate: `0px ${interpolate(board, [0, 1], [60, 0])}px`,
          scale: `1 ${1 - collapse * 0.9}`,
        }}
      >
        {/* Board header: the owner's day */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                background: C.water,
                border: `3px solid ${C.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonIcon size={42} color={C.cream} />
            </div>
            <div>
              <div style={{ color: C.cream, fontSize: 40, fontWeight: 600 }}>Your admin queue</div>
              <div style={{ color: C.mist, fontSize: 28 }}>Agent · Today</div>
            </div>
          </div>
          <div
            style={{
              minWidth: 120,
              padding: "10px 22px",
              borderRadius: 40,
              background: "#E5484D",
              color: "white",
              fontSize: 40,
              fontWeight: 700,
              textAlign: "center",
              scale: 1 + 0.08 * Math.max(0, Math.sin(frame / 3)) * (count > 0 ? 1 : 0),
            }}
          >
            {count}
          </div>
        </div>

        {TASKS.map((t, i) => {
          const s = springIn(frame, fps, 18 + i * 13, { damping: 13, stiffness: 140, mass: 0.7 });
          const Icon = t.icon;
          const jitter = Math.sin(frame * 0.9 + i * 1.7) * 4 * shake;
          return (
            <div
              key={t.text}
              style={{
                height: CARD_H,
                marginBottom: GAP,
                borderRadius: 26,
                background: C.surface,
                display: "flex",
                alignItems: "center",
                padding: "0 30px",
                gap: 24,
                boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
                opacity: s,
                translate: `${jitter}px ${interpolate(s, [0, 1], [260, 0])}px`,
                rotate: `${interpolate(s, [0, 1], [i % 2 ? 6 : -6, 0]) + jitter * 0.3}deg`,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 20,
                  background: t.urgent ? "#FDECEC" : C.surface2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={42} color={t.urgent ? "#D93A3F" : C.navy} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.ink, fontSize: 36, fontWeight: 600, lineHeight: 1.15 }}>{t.text}</div>
                <div style={{ color: C.muted, fontSize: 28 }}>{t.time}</div>
              </div>
              {t.urgent ? <div style={{ width: 18, height: 18, borderRadius: 9, background: "#E5484D" }} /> : null}
            </div>
          );
        })}
      </div>

      {/* Gold connector line that becomes the workflow in Scene 2 */}
      <div
        style={{
          position: "absolute",
          top: BOARD_TOP + 420,
          left: 540 - lineW / 2,
          width: lineW,
          height: 6,
          borderRadius: 3,
          background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          boxShadow: `0 0 24px ${C.glow}`,
        }}
      />
    </AbsoluteFill>
  );
};
