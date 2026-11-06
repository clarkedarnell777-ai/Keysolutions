import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, fadeUp, springIn } from "../anim";
import { Logo } from "../components/Logo";
import { SmallLabel } from "../components/SmallLabel";
import { SunsetBackdrop } from "../components/SunsetBackdrop";
import { C, SAFE, SANS } from "../theme";

// Prices verified against keysolutionsfl.com/ai-automation (Nov 2026)
const OFFERS = [
  { name: "AI Automation Audit", desc: "Written recommendations", price: "$95", unit: "one time", featured: true },
  { name: "AI + Apps Script Integration", desc: "One agreed workflow, built & tested", price: "$777", unit: "one time", featured: false },
  { name: "Maintenance (optional)", desc: "Monitoring & minor adjustments", price: "$99", unit: "per month", featured: false },
];

const END_AT = 288;

export const Scene6Offer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // Offer layer fully clears before the end card arrives, so the two never overlap
  const mainOut = interpolate(frame, [END_AT, END_AT + 10], [1, 0], clamp);
  const endIn = springIn(frame, fps, END_AT + 12, { damping: 200 });
  const finalFade = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, 1], clamp);
  const ctaPulse = 0.5 + 0.5 * Math.sin(frame / 7);
  const ctaIn = springIn(frame, fps, 150, { damping: 12, stiffness: 120 });

  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <SunsetBackdrop />
      {/* Darken the top for text legibility */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(21,28,53,0.75) 0%, rgba(21,28,53,0.35) 60%, rgba(21,28,53,0) 78%)" }} />

      <AbsoluteFill style={{ opacity: mainOut }}>
        <div style={{ position: "absolute", top: SAFE.top + 20, left: 0, right: 0 }}>
          <Logo size={78} delay={0} />
        </div>
        <div style={{ position: "absolute", top: 316, left: SAFE.left, width: SAFE.width, textAlign: "center" }}>
          <div style={{ color: C.cream, fontSize: 64, fontWeight: 700, lineHeight: 1.1, ...fadeUp(frame, fps, 8) }}>
            Find Out What<br />You Can Automate
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "center", ...fadeUp(frame, fps, 18, 20) }}>
            <div
              style={{
                padding: "8px 22px",
                borderRadius: 30,
                border: `2px solid ${C.gold}`,
                color: C.gold,
                fontSize: 30,
                fontWeight: 600,
              }}
            >
              Start with a free 10-minute intro call
            </div>
          </div>
        </div>

        {OFFERS.map((o, i) => {
          const s = springIn(frame, fps, 30 + i * 16, { damping: 15, stiffness: 130 });
          return (
            <div
              key={o.name}
              style={{
                position: "absolute",
                top: 580 + i * 190,
                left: SAFE.left,
                width: SAFE.width,
                height: 170,
                boxSizing: "border-box",
                padding: "0 34px",
                borderRadius: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: o.featured ? "rgba(27,35,66,0.95)" : "rgba(27,35,66,0.86)",
                border: `${o.featured ? 3 : 2}px solid ${o.featured ? C.gold : "rgba(217,220,234,0.25)"}`,
                boxShadow: o.featured ? "0 0 36px rgba(245,208,140,0.35)" : "0 12px 30px rgba(0,0,0,0.35)",
                opacity: s,
                translate: `0px ${interpolate(s, [0, 1], [70, 0])}px`,
              }}
            >
              {o.featured ? (
                <div
                  style={{
                    position: "absolute",
                    top: -22,
                    left: 34,
                    padding: "4px 16px",
                    borderRadius: 12,
                    background: C.gold,
                    color: C.night,
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}
                >
                  START HERE
                </div>
              ) : null}
              <div>
                <div style={{ color: C.cream, fontSize: 38, fontWeight: 600, lineHeight: 1.15 }}>{o.name}</div>
                <div style={{ color: C.mist, fontSize: 28, marginTop: 4 }}>{o.desc}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 20 }}>
                <div style={{ color: C.gold, fontSize: 60, fontWeight: 700, lineHeight: 1 }}>{o.price}</div>
                <div style={{ color: C.mist, fontSize: 28 }}>{o.unit}</div>
              </div>
            </div>
          );
        })}

        <div
          style={{
            position: "absolute",
            top: 1172,
            left: SAFE.left,
            width: SAFE.width,
            height: 96,
            borderRadius: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: C.gold,
            color: C.night,
            fontSize: 38,
            fontWeight: 700,
            boxShadow: `0 0 ${20 + ctaPulse * 30}px rgba(245,208,140,${0.4 + ctaPulse * 0.3})`,
            opacity: ctaIn,
            scale: interpolate(ctaIn, [0, 1], [0.8, 1]),
          }}
        >
          Explore Your Automation Opportunities
        </div>
        <div
          style={{
            position: "absolute",
            top: 1296,
            left: SAFE.left,
            width: SAFE.width,
            textAlign: "center",
            color: C.cream,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: 1,
            textShadow: "0 2px 12px rgba(21,28,53,0.95), 0 0 4px rgba(21,28,53,0.9)",
            ...fadeUp(frame, fps, 170, 20),
          }}
        >
          keysolutionsfl.com
        </div>
        <SmallLabel opacity={interpolate(frame, [60, 80], [0, 1], clamp)}>
          Larger projects quoted separately. No guarantee of leads or revenue.
        </SmallLabel>
      </AbsoluteFill>

      {/* End card: logo settles with the URL, then fade out */}
      <AbsoluteFill
        style={{
          opacity: endIn,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
          paddingBottom: 380,
        }}
      >
        <div style={{ scale: interpolate(frame, [END_AT, durationInFrames], [0.92, 1.06], clamp) }}>
          <Logo size={112} animate={false} />
        </div>
        <div style={{ color: C.gold, fontSize: 30, fontWeight: 700, letterSpacing: 5 }}>AI AUTOMATION · APPS SCRIPT</div>
        <div style={{ color: C.cream, fontSize: 56, fontWeight: 700 }}>keysolutionsfl.com</div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: C.night, opacity: finalFade }} />
    </AbsoluteFill>
  );
};
