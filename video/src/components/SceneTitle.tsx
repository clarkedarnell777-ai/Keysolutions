import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp } from "../anim";
import { C, SANS, SAFE } from "../theme";

/** Gold letter-spaced eyebrow + cream headline, anchored to the top safe zone. */
export const SceneTitle: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  top?: number;
  size?: number;
  delay?: number;
}> = ({ eyebrow, title, top = SAFE.top + 20, size = 64, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: SAFE.left,
        width: SAFE.width,
        textAlign: "center",
        fontFamily: SANS,
      }}
    >
      <div
        style={{
          color: C.gold,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
          ...fadeUp(frame, fps, delay, 20),
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: 14,
          color: C.cream,
          fontSize: size,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: -0.5,
          ...fadeUp(frame, fps, delay + 4, 40),
        }}
      >
        {title}
      </div>
    </div>
  );
};
