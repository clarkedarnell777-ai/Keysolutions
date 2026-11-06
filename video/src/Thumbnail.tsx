import type React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "./components/Background";
import { CheckIcon, ClockIcon, MailIcon, SheetIcon } from "./components/Icons";
import { Logo } from "./components/Logo";
import { C, SAFE, SANS } from "./theme";

const ITEMS = [
  { icon: MailIcon, text: "Lead logged & reply drafted" },
  { icon: SheetIcon, text: "Sheet updated automatically" },
  { icon: ClockIcon, text: "Follow-up reminder set" },
];

/** Cover image for the video (1080×1920). */
export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: SANS }}>
    <Background glow={0.35} />
    <div style={{ position: "absolute", top: SAFE.top + 40, left: 0, right: 0 }}>
      <Logo size={96} animate={false} />
    </div>
    <div style={{ position: "absolute", top: 420, left: SAFE.left, width: SAFE.width, textAlign: "center" }}>
      <div style={{ color: C.gold, fontSize: 32, fontWeight: 700, letterSpacing: 6 }}>AI AUTOMATION FOR<br />REALTORS & SMALL BUSINESS</div>
      <div style={{ marginTop: 28, color: C.cream, fontSize: 104, fontWeight: 700, lineHeight: 1.05 }}>
        Still Paying for Repetitive Work?
      </div>
    </div>
    <div style={{ position: "absolute", top: 940, left: SAFE.left + 40, width: SAFE.width - 80 }}>
      {ITEMS.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              height: 116,
              marginBottom: 22,
              padding: "0 28px",
              borderRadius: 26,
              background: C.surface,
              boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
            }}
          >
            <Icon size={44} color={C.navy} />
            <div style={{ flex: 1, color: C.ink, fontSize: 38, fontWeight: 600 }}>{it.text}</div>
            <CheckIcon size={44} color={C.green} />
          </div>
        );
      })}
    </div>
    <div style={{ position: "absolute", top: 1400, left: 0, right: 0, textAlign: "center", color: C.cream, fontSize: 52, fontWeight: 700 }}>
      keysolutionsfl.com
    </div>
  </AbsoluteFill>
);
