import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, springIn } from "../anim";
import { C, SERIF } from "../theme";
import { KeyIcon } from "./Icons";

/** Key Solutions wordmark: gold key + serif name + thin gold rule (from the brand banner). */
export const Logo: React.FC<{ size?: number; delay?: number; showRule?: boolean; animate?: boolean }> = ({
  size = 96,
  delay = 0,
  showRule = true,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = animate ? springIn(frame, fps, delay, { damping: 12, stiffness: 110, mass: 0.9 }) : 1;
  const rule = animate ? interpolate(frame - delay, [12, 32], [0, 1], clamp) : 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: size * 0.22,
          opacity: s,
          scale: interpolate(s, [0, 1], [0.6, 1]),
        }}
      >
        <div style={{ rotate: `${interpolate(s, [0, 1], [-35, 0])}deg`, display: "flex" }}>
          <KeyIcon size={size * 0.62} color={C.gold} strokeWidth={2.2} />
        </div>
        <div style={{ fontFamily: SERIF, color: C.cream, fontSize: size, lineHeight: 1, whiteSpace: "nowrap" }}>
          Key Solutions
        </div>
      </div>
      {showRule ? (
        <div
          style={{
            marginTop: size * 0.22,
            height: 3,
            width: size * 1.3 * rule,
            background: C.gold,
            borderRadius: 2,
          }}
        />
      ) : null}
    </div>
  );
};
