import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";

/** Brand dusk background: night-navy gradient with a faint warm horizon glow and drifting dot grid. */
export const Background: React.FC<{ glow?: number }> = ({ glow = 0.18 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.night} 0%, ${C.navy900} 45%, ${C.navy} 100%)` }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 40% at 50% 108%, rgba(245,208,140,${glow}) 0%, rgba(128,96,109,${glow * 0.6}) 45%, transparent 75%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(217,220,234,0.07) 2px, transparent 2px)",
          backgroundSize: "48px 48px",
          backgroundPosition: `0px ${(frame * 0.4) % 48}px`,
        }}
      />
    </AbsoluteFill>
  );
};
