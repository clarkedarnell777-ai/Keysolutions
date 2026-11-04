import React from "react";
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, COLORS, FONTS, SAFE, TYPE } from "./brand";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Graded footage with a slow, gentle Ken Burns move. */
export const Footage: React.FC<{
  readonly src: string;
  readonly zoom?: [number, number];
  readonly origin?: string;
  readonly drift?: [string, string];
}> = ({ src, zoom = [1.02, 1.08], origin = "50% 50%", drift = ["0px 0px", "0px 0px"] }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, overflow: "hidden" }}>
      <Video
        src={staticFile(src)}
        muted
        premountFor={fps}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: origin,
          scale: interpolate(frame, [0, durationInFrames], zoom, { ...clamp, easing: Easing.inOut(Easing.sin) }),
          translate: interpolate(frame, [0, durationInFrames], drift, clamp),
        }}
      />
    </AbsoluteFill>
  );
};

/** Soft top & bottom gradients + vignette so white text always reads. */
export const Shade: React.FC<{ readonly strength?: number }> = ({ strength = 1 }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, rgba(11,11,12,${0.55 * strength}) 0%, rgba(11,11,12,0) 22%, rgba(11,11,12,0) 52%, rgba(11,11,12,${0.78 * strength}) 100%)`,
      }}
    />
    <AbsoluteFill
      style={{ background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,${0.35 * strength}) 100%)` }}
    />
  </AbsoluteFill>
);

/** Persistent brand label (top) and compliance label (bottom). */
export const BrandChrome: React.FC<{ readonly fadeIn?: number }> = ({ fadeIn = 12 }) => {
  const frame = useCurrentFrame();
  const o = fadeIn > 0 ? interpolate(frame, [0, fadeIn], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill style={{ opacity: o, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: SAFE.top + 6,
          left: SAFE.side,
          right: SAFE.side,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          fontFamily: FONTS.sans,
          fontWeight: 600,
          fontSize: TYPE.label,
          letterSpacing: "0.32em",
          color: COLORS.goldLight,
          textShadow: "0 2px 12px rgba(0,0,0,0.55)",
        }}
      >
        <KeyMark size={40} />
        <span>KEY SOLUTIONS</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 4,
          left: SAFE.side,
          right: SAFE.side,
          textAlign: "center",
          fontFamily: FONTS.sans,
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: "0.16em",
          color: COLORS.softWhite,
          textShadow: "0 2px 10px rgba(0,0,0,0.7)",
        }}
      >
        PAST OPEN HOUSE · NOT AN ACTIVE LISTING
      </div>
    </AbsoluteFill>
  );
};

/** Minimal key monogram used as the brand mark. */
export const KeyMark: React.FC<{ readonly size?: number; readonly color?: string; readonly draw?: number }> = ({
  size = 64,
  color = COLORS.gold,
  draw = 1,
}) => {
  const len = 260;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="32" cy="50" r="18" stroke={color} strokeWidth="5" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
      <path
        d="M50 50 H90 M78 50 V63 M88 50 V60"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="square"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
    </svg>
  );
};

/** Opening hook: kicker, two-line serif headline revealed line by line, gold rule. */
export const HookTitle: React.FC<{
  readonly kicker: string;
  readonly lines: string[];
  readonly top?: number;
  readonly outAt?: number;
}> = ({ kicker, lines, top = 1080, outAt }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const end = outAt ?? durationInFrames - 14;
  const out = interpolate(frame, [end, end + 12], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(11,11,12,0) ${((top - 260) / 1920) * 100}%, rgba(11,11,12,0.62) ${((top + 80) / 1920) * 100}%, rgba(11,11,12,0.7) 100%)`,
          opacity: interpolate(frame, [0, 14], [0, 1], clamp),
        }}
      />
      <div style={{ position: "absolute", top, left: SAFE.side + 20, right: SAFE.side + 20 }}>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: TYPE.label,
            letterSpacing: "0.3em",
            color: COLORS.goldLight,
            opacity: interpolate(frame, [4, 18], [0, 1], clamp),
            translate: interpolate(frame, [4, 22], ["0px 18px", "0px 0px"], { ...clamp, easing: ease }),
            marginBottom: 26,
          }}
        >
          {kicker}
        </div>
        {lines.map((line, i) => (
          <div key={line} style={{ overflow: "hidden", paddingBottom: 8 }}>
            <div
              style={{
                fontFamily: FONTS.serif,
                fontWeight: 600,
                fontSize: TYPE.headline + 8,
                lineHeight: 1.08,
                color: COLORS.white,
                textShadow: "0 4px 24px rgba(0,0,0,0.45)",
                translate: interpolate(frame, [10 + i * 7, 34 + i * 7], ["0px 120px", "0px 0px"], { ...clamp, easing: ease }),
              }}
            >
              {line}
            </div>
          </div>
        ))}
        <div
          style={{
            marginTop: 30,
            height: 3,
            backgroundColor: COLORS.gold,
            width: interpolate(frame, [26, 52], [0, 260], { ...clamp, easing: ease }),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/** Editorial caption: gold bar + text, slides up in and fades out. */
export const Caption: React.FC<{
  readonly text: string;
  readonly sub?: string;
  readonly inAt?: number;
  readonly outAt?: number;
  readonly bottom?: number;
  readonly top?: number;
}> = ({ text, sub, inAt = 8, outAt, bottom = 290, top }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const end = outAt ?? durationInFrames - 12;
  const inP = interpolate(frame, [inAt, inAt + 18], [0, 1], { ...clamp, easing: ease });
  const outP = interpolate(frame, [end, end + 10], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: Math.min(inP, outP) }}>
      <div
        style={{
          position: "absolute",
          ...(top !== undefined ? { top } : { bottom }),
          left: SAFE.side + 10,
          right: SAFE.side + 10,
          display: "flex",
          gap: 26,
          alignItems: "stretch",
          translate: `0px ${(1 - inP) * (top !== undefined ? -40 : 40)}px`,
        }}
      >
        <div style={{ width: 5, backgroundColor: COLORS.gold, flexShrink: 0, scale: `1 ${inP}`, transformOrigin: "50% 100%" }} />
        <div>
          <div
            style={{
              fontFamily: FONTS.serif,
              fontWeight: 600,
              fontSize: TYPE.headlineSm,
              lineHeight: 1.12,
              color: COLORS.white,
              textShadow: "0 3px 18px rgba(0,0,0,0.55)",
            }}
          >
            {text}
          </div>
          {sub ? (
            <div
              style={{
                marginTop: 14,
                fontFamily: FONTS.sans,
                fontWeight: 500,
                fontSize: 36,
                letterSpacing: "0.04em",
                color: COLORS.softWhite,
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              {sub}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Branded closing screen with website call to action and compliance line. */
export const EndCard: React.FC<{ readonly cta?: string }> = ({ cta = "Let's connect" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = (a: number, b: number) => interpolate(frame, [a, b], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 38%, ${COLORS.charcoal} 0%, ${COLORS.black} 70%)`,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side,
      }}
    >
      {/* fine gold frame */}
      <div
        style={{
          position: "absolute",
          top: SAFE.top - 40,
          bottom: SAFE.bottom - 40,
          left: SAFE.side - 20,
          right: SAFE.side - 20,
          border: `1.5px solid ${COLORS.goldDeep}`,
          opacity: f(0, 30) * 0.7,
        }}
      />
      <div style={{ opacity: f(0, 20), marginBottom: 30 }}>
        <KeyMark size={150} draw={f(0, 1.1 * fps)} />
      </div>
      <div
        style={{
          fontFamily: FONTS.serif,
          fontWeight: 600,
          fontSize: 112,
          letterSpacing: "0.02em",
          color: COLORS.white,
          lineHeight: 1,
          opacity: f(8, 26),
          translate: `0px ${(1 - f(8, 30)) * 30}px`,
        }}
      >
        Key Solutions
      </div>
      <div
        style={{
          marginTop: 22,
          fontFamily: FONTS.sans,
          fontWeight: 600,
          fontSize: 34,
          letterSpacing: "0.5em",
          paddingLeft: "0.5em",
          color: COLORS.gold,
          opacity: f(16, 34),
        }}
      >
        REAL ESTATE
      </div>
      <div style={{ height: 2, backgroundColor: COLORS.gold, width: f(24, 50) * 320, margin: "54px auto 50px" }} />
      <div style={{ fontFamily: FONTS.sans, fontWeight: 500, fontSize: 40, color: COLORS.white, opacity: f(30, 46) }}>
        {BRAND.identity}
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: FONTS.serif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 44,
          color: COLORS.goldLight,
          opacity: f(36, 52),
        }}
      >
        {BRAND.tagline}
      </div>
      <div
        style={{
          marginTop: 90,
          fontFamily: FONTS.sans,
          fontWeight: 500,
          fontSize: 32,
          letterSpacing: "0.24em",
          color: COLORS.softWhite,
          opacity: f(46, 60),
        }}
      >
        {cta.toUpperCase()}
      </div>
      <div
        style={{
          marginTop: 22,
          padding: "22px 46px",
          border: `2px solid ${COLORS.gold}`,
          fontFamily: FONTS.sans,
          fontWeight: 600,
          fontSize: 50,
          letterSpacing: "0.04em",
          color: COLORS.white,
          opacity: f(52, 68),
          scale: interpolate(frame, [52, 72], [0.94, 1], { ...clamp, easing: ease }),
        }}
      >
        {BRAND.website}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 10,
          left: SAFE.side + 20,
          right: SAFE.side + 20,
          fontFamily: FONTS.sans,
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 1.4,
          color: "rgba(247,245,240,0.62)",
          opacity: f(40, 60),
        }}
      >
        {BRAND.disclosure}
      </div>
    </AbsoluteFill>
  );
};
