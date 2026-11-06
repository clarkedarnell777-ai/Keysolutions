import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, fadeUp, springIn } from "../anim";
import { Background } from "../components/Background";
import { CodeIcon, ListCheckIcon, MailIcon, SheetIcon, SparkleIcon } from "../components/Icons";
import { Logo } from "../components/Logo";
import { SmallLabel } from "../components/SmallLabel";
import { C, SAFE, SANS } from "../theme";

const NODES = [
  { icon: SheetIcon, label: "Google Sheets", sub: "Leads & data", tint: "#2E9E6A" },
  { icon: CodeIcon, label: "Apps Script", sub: "Connects the steps", tint: "#3B6FD8" },
  { icon: SparkleIcon, label: "AI", sub: "Drafts & sorts", tint: C.gold },
  { icon: MailIcon, label: "Gmail", sub: "You approve, it sends", tint: "#D9534F" },
  { icon: ListCheckIcon, label: "Lead Tracker", sub: "Status stays current", tint: C.mauve },
];

const FLOW_TOP = 640;
const NODE_H = 104;
const NODE_GAP = 40;
const NODE_W = 800;

export const Scene2Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nodeStart = 70;
  const step = 14;
  const pulseT = interpolate(frame, [nodeStart + 5 * step + 10, 270], [0, 1], clamp);
  const totalH = NODES.length * NODE_H + (NODES.length - 1) * NODE_GAP;

  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Background />
      <div style={{ position: "absolute", top: SAFE.top + 30, left: 0, right: 0 }}>
        <Logo size={104} delay={4} />
      </div>
      <div style={{ position: "absolute", top: 380, left: SAFE.left, width: SAFE.width, textAlign: "center" }}>
        <div style={{ color: C.cream, fontSize: 60, fontWeight: 700, lineHeight: 1.12, ...fadeUp(frame, fps, 22) }}>
          Meet Smarter<br />Business Automation
        </div>
        <div style={{ marginTop: 16, color: C.mist, fontSize: 36, fontWeight: 500, ...fadeUp(frame, fps, 34) }}>
          AI + Google Apps Script + <span style={{ color: C.gold }}>Your Existing Tools</span>
        </div>
      </div>

      {/* Workflow chain */}
      <div style={{ position: "absolute", top: FLOW_TOP, left: (1080 - NODE_W) / 2, width: NODE_W, height: totalH }}>
        {NODES.slice(0, -1).map((n, i) => {
          const y0 = i * (NODE_H + NODE_GAP) + NODE_H;
          const draw = interpolate(frame, [nodeStart + i * step + 8, nodeStart + i * step + 22], [0, 1], clamp);
          return (
            <div
              key={`line-${n.label}`}
              style={{
                position: "absolute",
                left: NODE_W / 2 - 3,
                top: y0,
                width: 6,
                height: NODE_GAP * draw,
                background: C.gold,
                opacity: 0.8,
                borderRadius: 3,
              }}
            />
          );
        })}
        {NODES.map((n, i) => {
          const s = springIn(frame, fps, nodeStart + i * step, { damping: 14, stiffness: 130, mass: 0.8 });
          const Icon = n.icon;
          const center = i / (NODES.length - 1);
          const lit = Math.max(0, 1 - Math.abs(pulseT - center) * 6) * (pulseT > 0 ? 1 : 0);
          return (
            <div
              key={n.label}
              style={{
                position: "absolute",
                top: i * (NODE_H + NODE_GAP),
                left: 0,
                width: NODE_W,
                height: NODE_H,
                borderRadius: 28,
                background: "rgba(36,46,85,0.92)",
                border: `2px solid rgba(216,182,106,${0.35 + lit * 0.65})`,
                boxShadow: `0 0 ${10 + lit * 40}px rgba(245,208,140,${0.15 + lit * 0.5})`,
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "0 30px",
                opacity: s,
                scale: interpolate(s, [0, 1], [0.7, 1]),
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  background: n.tint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={40} color="#FFFFFF" />
              </div>
              <div style={{ color: C.cream, fontSize: 40, fontWeight: 600, flex: 1, whiteSpace: "nowrap" }}>{n.label}</div>
              <div style={{ color: C.mist, fontSize: 28, textAlign: "right" }}>{n.sub}</div>
            </div>
          );
        })}
        {/* Travelling pulse */}
        {pulseT > 0 && pulseT < 1 ? (
          <div
            style={{
              position: "absolute",
              left: NODE_W / 2 - 14,
              top: NODE_H / 2 - 14 + pulseT * (totalH - NODE_H),
              width: 28,
              height: 28,
              borderRadius: 14,
              background: C.glow,
              boxShadow: `0 0 30px 12px rgba(245,208,140,0.6)`,
            }}
          />
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          top: FLOW_TOP + totalH + 34,
          left: SAFE.left,
          width: SAFE.width,
          textAlign: "center",
          color: C.gold,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 2,
          ...fadeUp(frame, fps, nodeStart + 5 * step + 6, 20),
        }}
      >
        Tailored to your actual business process
      </div>
      <SmallLabel opacity={interpolate(frame, [40, 60], [0, 1], clamp)}>
        Google product names are trademarks of Google LLC.
      </SmallLabel>
    </AbsoluteFill>
  );
};
