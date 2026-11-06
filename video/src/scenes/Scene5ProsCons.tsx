import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, springIn } from "../anim";
import { Background } from "../components/Background";
import { CheckIcon, WarningIcon } from "../components/Icons";
import { SceneTitle } from "../components/SceneTitle";
import { C, SAFE, SANS } from "../theme";

const BENEFITS = [
  "Less repetitive data entry",
  "Faster lead organization",
  "More consistent follow-up",
  "Potentially lower admin costs",
  "Works with Google Workspace tools",
];
const LIMITS = [
  "Setup and testing required",
  "AI can make mistakes",
  "API & software costs may apply",
  "Apps Script quotas & run-time limits",
  "Human oversight & data security matter",
];

const ITEM_H = 78;

const Panel: React.FC<{
  top: number;
  heading: string;
  color: string;
  items: string[];
  start: number;
  kind: "pro" | "con";
  emphasize?: { index: number; at: number };
}> = ({ top, heading, color, items, start, kind, emphasize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springIn(frame, fps, start - 6, { damping: 200 });
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: SAFE.left,
        width: SAFE.width,
        height: 506,
        boxSizing: "border-box",
        padding: "24px 30px",
        borderRadius: 28,
        background: "rgba(36,46,85,0.9)",
        borderTop: `6px solid ${color}`,
        boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [40, 0])}px`,
      }}
    >
      <div style={{ color, fontSize: 30, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", marginBottom: 12 }}>
        {heading}
      </div>
      {items.map((it, i) => {
        const s = springIn(frame, fps, start + i * 13, { damping: 14, stiffness: 150, mass: 0.7 });
        const em =
          emphasize && emphasize.index === i
            ? interpolate(frame, [emphasize.at, emphasize.at + 8, emphasize.at + 40], [0, 1, 0.3], clamp)
            : 0;
        return (
          <div
            key={it}
            style={{
              height: ITEM_H,
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: s,
              translate: `${interpolate(s, [0, 1], [kind === "pro" ? -60 : 60, 0])}px 0px`,
              background: `rgba(232,163,61,${0.16 * em})`,
              borderRadius: 14,
              marginLeft: -10,
              paddingLeft: 10,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: kind === "pro" ? "rgba(60,196,143,0.18)" : "transparent",
                border: kind === "pro" ? "none" : `2px solid rgba(232,163,61,0.6)`,
                scale: interpolate(s, [0, 1], [0.4, 1]),
              }}
            >
              {kind === "pro" ? <CheckIcon size={34} color={color} /> : <WarningIcon size={30} color={color} />}
            </div>
            <div style={{ color: C.cream, fontSize: 36, fontWeight: 500, whiteSpace: "nowrap" }}>{it}</div>
          </div>
        );
      })}
    </div>
  );
};

export const Scene5ProsCons: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Background />
      <SceneTitle eyebrow="Honest Evaluation" title={<>Powerful Automation.<br />Real Trade-Offs.</>} size={60} />
      <Panel top={400} heading="Benefits" color={C.green} items={BENEFITS} start={14} kind="pro" />
      <Panel
        top={930}
        heading="Limitations"
        color={C.amber}
        items={LIMITS}
        start={112}
        kind="con"
        emphasize={{ index: 1, at: 222 }}
      />
    </AbsoluteFill>
  );
};
