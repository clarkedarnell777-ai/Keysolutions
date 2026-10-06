import type React from "react";
import { loadFont } from "@remotion/fonts";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Inter is bundled in public/fonts so renders work offline.
export const fontFamily = "Inter";
for (const weight of ["400", "600", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/Inter-${weight}.woff2`),
    weight,
  });
}

export const COLORS = {
  bg: "#0a0a0a",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.72)",
  faint: "rgba(255,255,255,0.14)",
  card: "rgba(255,255,255,0.05)",
  accent: "#6366f1",
  success: "#22c55e",
};

// Safe zone: 150px top, 170px bottom, 60px sides (we pad a little more).
export const SAFE = { top: 160, bottom: 190, side: 80 };

export const FONT = { headline: 84, body: 42, label: 32 };

/** Spring progress (0 → 1) starting at `delay` frames. */
export const useEnter = (delay: number, durationInFrames?: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames,
  });
};

/** Fade + rise entrance driven by a spring progress value. */
export const enter = (p: number, distance = 40): React.CSSProperties => ({
  opacity: p,
  translate: `0px ${interpolate(p, [0, 1], [distance, 0])}px`,
});

/** Count-up value with eased interpolate(). */
export const useCountUp = (to: number, start: number, end: number) => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [start, end], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );
};

export const formatNumber = (n: number) => n.toLocaleString("en-US");

/** Scene shell: background, safe-zone padding, font. */
export const SceneFrame: React.FC<{
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{
      backgroundColor: COLORS.bg,
      color: COLORS.text,
      fontFamily,
      padding: `${SAFE.top}px ${SAFE.side}px ${SAFE.bottom}px`,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Step kicker, 5-segment progress bar, headline and explanation. */
export const SceneHeader: React.FC<{
  readonly step: number;
  readonly headline: string;
  readonly body: string;
}> = ({ step, headline, body }) => {
  const kicker = useEnter(0);
  const title = useEnter(8);
  const text = useEnter(18);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div
        style={{
          ...enter(kicker, 20),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: FONT.label,
            fontWeight: 600,
            letterSpacing: 3,
            color: COLORS.accent,
          }}
        >
          FLORIDA HOME BUYING
        </div>
        <div
          style={{
            fontSize: FONT.label,
            fontWeight: 600,
            color: COLORS.muted,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          STEP {step}/5
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, opacity: kicker }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              backgroundColor: COLORS.faint,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(i < step ? 1 : i === step ? title : 0) * 100}%`,
                backgroundColor: i === step ? COLORS.accent : COLORS.success,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          ...enter(title, 50),
          fontSize: FONT.headline,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
          marginTop: 12,
        }}
      >
        {headline}
      </div>
      <div
        style={{
          ...enter(text, 40),
          fontSize: FONT.body,
          fontWeight: 400,
          lineHeight: 1.35,
          color: COLORS.muted,
        }}
      >
        {body}
      </div>
    </div>
  );
};

/** Big tabular number with a label underneath. */
export const StatCounter: React.FC<{
  readonly value: number;
  readonly start: number;
  readonly end: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label: string;
  readonly color?: string;
}> = ({ value, start, end, prefix = "", suffix = "", label, color }) => {
  const p = useEnter(start - 6);
  const n = useCountUp(value, start, end);
  return (
    <div
      style={{
        ...enter(p, 40),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          fontSize: 132,
          fontWeight: 800,
          letterSpacing: -4,
          lineHeight: 1,
          color: color ?? COLORS.text,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {prefix}
        {formatNumber(n)}
        {suffix}
      </div>
      <div
        style={{ fontSize: FONT.label + 4, fontWeight: 600, color: COLORS.muted }}
      >
        {label}
      </div>
    </div>
  );
};

/** Stroke props for self-drawing SVG shapes (use with pathLength={1}). */
export const drawProps = (p: number) => ({
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1 - p,
});
