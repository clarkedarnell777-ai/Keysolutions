import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, springIn } from "../anim";
import { Background } from "../components/Background";
import {
  ArrowIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  FlagIcon,
  SheetIcon,
  SparkleIcon,
  StoreIcon,
  WrenchIcon,
} from "../components/Icons";
import { SceneTitle } from "../components/SceneTitle";
import { C, SAFE, SANS } from "../theme";

type ChipKind = "neutral" | "done" | "ai" | "sheet" | "slot" | "flag";
type Step = { text: string; kind: ChipKind; arrowAfter?: boolean };

const chipStyle = (kind: ChipKind): React.CSSProperties => {
  switch (kind) {
    case "done":
      return { background: "rgba(60,196,143,0.18)", border: `2px solid ${C.green}`, color: "#BFF3DC" };
    case "ai":
      return { background: "rgba(216,182,106,0.16)", border: `2px solid ${C.gold}`, color: C.glow };
    case "sheet":
      return { background: "rgba(46,158,106,0.2)", border: "2px solid #2E9E6A", color: "#CDEFDD" };
    case "slot":
      return { background: C.surface, border: `2px solid ${C.surface}`, color: C.ink };
    case "flag":
      return { background: "rgba(232,163,61,0.2)", border: `2px solid ${C.amber}`, color: "#FFE2B5" };
    default:
      return { background: "rgba(217,220,234,0.1)", border: "2px solid rgba(217,220,234,0.35)", color: C.mist };
  }
};

const chipIcon = (kind: ChipKind) => {
  if (kind === "done") return <CheckIcon size={28} color={C.green} />;
  if (kind === "ai") return <SparkleIcon size={28} color={C.gold} />;
  if (kind === "sheet") return <SheetIcon size={28} color="#7FD6A9" />;
  if (kind === "slot") return <CalendarIcon size={28} color={C.navy} />;
  if (kind === "flag") return <FlagIcon size={28} color={C.amber} />;
  return null;
};

const UseCase: React.FC<{
  top: number;
  start: number;
  activeUntil: number;
  icon: React.FC<{ size?: number; color?: string }>;
  title: string;
  subtitle: string;
  steps: Step[];
  note?: string;
}> = ({ top, start, activeUntil, icon: Icon, title, subtitle, steps, note }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springIn(frame, fps, start, { damping: 15, stiffness: 120 });
  const active = interpolate(frame, [start, start + 8, activeUntil, activeUntil + 10], [0, 1, 1, 0.35], clamp);
  const settled = frame > activeUntil ? 0.35 : active;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: SAFE.left,
        width: SAFE.width,
        height: 330,
        boxSizing: "border-box",
        padding: "26px 30px",
        borderRadius: 28,
        background: "rgba(36,46,85,0.92)",
        border: `2px solid rgba(216,182,106,${0.25 + 0.75 * settled})`,
        boxShadow: `0 0 ${40 * settled}px rgba(245,208,140,${0.35 * settled}), 0 16px 40px rgba(0,0,0,0.35)`,
        opacity: s * interpolate(settled, [0.35, 1], [0.82, 1]),
        translate: `${interpolate(s, [0, 1], [120, 0])}px 0px`,
        scale: interpolate(settled, [0.35, 1], [0.97, 1]),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            background: C.gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={42} color={C.night} />
        </div>
        <div>
          <div style={{ color: C.cream, fontSize: 40, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ color: C.mist, fontSize: 30 }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 26 }}>
        {steps.map((st, i) => {
          const cs = springIn(frame, fps, start + 14 + i * 9, { damping: 13, stiffness: 160, mass: 0.6 });
          return (
            <div key={st.text} style={{ display: "flex", alignItems: "center", gap: 12, opacity: cs, scale: interpolate(cs, [0, 1], [0.6, 1]) }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 18px",
                  borderRadius: 18,
                  fontSize: 30,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  ...chipStyle(st.kind),
                }}
              >
                {chipIcon(st.kind)}
                {st.text}
              </div>
              {st.arrowAfter ? <ArrowIcon size={30} color={C.gold} /> : null}
            </div>
          );
        })}
      </div>
      {note ? (
        <div style={{ position: "absolute", right: 30, top: 34, color: C.mist, fontSize: 28, opacity: 0.85 }}>{note}</div>
      ) : null}
    </div>
  );
};

export const Scene4Applications: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Background />
      <SceneTitle eyebrow="Beyond Real Estate" title="Not Just for Real Estate" size={64} />
      <UseCase
        top={360}
        start={10}
        activeUntil={90}
        icon={WrenchIcon}
        title="Service Company"
        subtitle="HVAC & plumbing requests"
        steps={[
          { text: "Service request", kind: "neutral", arrowAfter: true },
          { text: "Logged in Sheet", kind: "sheet", arrowAfter: true },
          { text: "Acknowledgment sent", kind: "done" },
        ]}
      />
      <UseCase
        top={720}
        start={58}
        activeUntil={160}
        icon={BriefcaseIcon}
        title="Professional Services"
        subtitle="Consultation inquiries"
        steps={[
          { text: "Inquiry", kind: "neutral", arrowAfter: true },
          { text: "AI drafts reply", kind: "ai", arrowAfter: true },
          { text: "Tue 10:00", kind: "slot" },
          { text: "Wed 2:00", kind: "slot" },
          { text: "Thu 11:30", kind: "slot" },
        ]}
      />
      <UseCase
        top={1080}
        start={120}
        activeUntil={330}
        icon={StoreIcon}
        title="Small Business Ops"
        subtitle="Many inquiries, sorted & flagged"
        steps={[
          { text: "Quote", kind: "ai" },
          { text: "Support", kind: "ai" },
          { text: "Billing", kind: "ai" },
          { text: "Urgent: needs attention", kind: "flag" },
        ]}
      />
    </AbsoluteFill>
  );
};
