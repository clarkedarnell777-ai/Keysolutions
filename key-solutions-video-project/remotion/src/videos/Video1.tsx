import React from "react";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { COLORS } from "../brand/brand";
import { BrandChrome, Caption, EndCard, Footage, HookTitle, Shade } from "../brand/components";

/**
 * VIDEO 1 — Meet Your Real Estate Connection (30 s, 1080x1920, 30 fps)
 * Score: original smooth-jazz piece at 80 BPM → one bar = 3 s = 90 frames.
 * Cuts are placed close to bar lines; dissolves are 12 frames.
 */
export const Video1: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const T = 12; // cross-dissolve length

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <TransitionSeries>
        {/* 1 — HOOK: screened lanai & pool (strongest exterior) */}
        <TransitionSeries.Sequence name="Hook · Lanai pool" durationInFrames={118} premountFor={fps}>
          <Footage src="footage/v1_02_lanai_pool.mp4" zoom={[1.1, 1.02]} origin="50% 45%" />
          <Shade strength={1.15} />
          <BrandChrome />
          <HookTitle kicker="OPEN HOUSE · MARCH 2026" lines={["Meet Your", "Real Estate", "Connection"]} top={1000} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 2 — Front entry */}
        <TransitionSeries.Sequence name="Front entry" durationInFrames={102} premountFor={fps}>
          <Footage src="footage/v1_01_front_entry.mp4" zoom={[1.0, 1.06]} origin="50% 40%" />
          <Shade />
          <BrandChrome fadeIn={0} />
          <Caption text="Licensed Florida Realtor" sub="Key Solutions Real Estate" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 3 — Great room */}
        <TransitionSeries.Sequence name="Great room" durationInFrames={102} premountFor={fps}>
          <Footage src="footage/v1_03_great_room.mp4" zoom={[1.02, 1.08]} origin="45% 55%" />
          <Shade />
          <BrandChrome fadeIn={0} />
          <Caption text="Out touring homes and learning the market" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 4 — THE MIRROR MOMENT: 50% slow motion + slow push-in toward the reflection */}
        <TransitionSeries.Sequence name="Mirror moment" durationInFrames={88} premountFor={fps}>
          <Footage src="footage/v1_04_mirror_slowmo.mp4" zoom={[1.0, 1.18]} origin="50% 58%" />
          <Shade strength={0.9} />
          <BrandChrome fadeIn={0} />
          <Caption text="Yes — that's me in the mirror." sub="Your Key Solutions Realtor" inAt={14} outAt={74} top={300} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 5 — Kitchen island */}
        <TransitionSeries.Sequence name="Kitchen island" durationInFrames={102} premountFor={fps}>
          <Footage src="footage/v1_05_kitchen_island.mp4" zoom={[1.06, 1.0]} />
          <Shade />
          <BrandChrome fadeIn={0} />
          <Caption text="Helping you buy, sell, or invest in Florida" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 6 — Coral-stone fireplace */}
        <TransitionSeries.Sequence name="Fireplace" durationInFrames={94} premountFor={fps}>
          <Footage src="footage/v1_06_fireplace.mp4" zoom={[1.0, 1.06]} origin="50% 60%" />
          <Shade />
          <BrandChrome fadeIn={0} />
          <Caption text="Building California–Florida connections" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 7 — Primary bath */}
        <TransitionSeries.Sequence name="Primary bath" durationInFrames={102} premountFor={fps}>
          <Footage src="footage/v1_07_primary_bath.mp4" zoom={[1.07, 1.01]} />
          <Shade />
          <BrandChrome fadeIn={0} />
          <Caption text="Thinking about a move to Florida?" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 8 — Lanai outdoor bar */}
        <TransitionSeries.Sequence name="Outdoor bar" durationInFrames={102} premountFor={fps}>
          <Footage src="footage/v1_08_outdoor_bar.mp4" zoom={[1.0, 1.07]} />
          <Shade />
          <BrandChrome fadeIn={0} />
          <Caption text="Let's connect." sub="Your questions are always welcome" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />

        {/* 9 — Branded closing screen */}
        <TransitionSeries.Sequence name="End card" durationInFrames={189} premountFor={fps}>
          <EndCard cta="Let's connect" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio
        src={staticFile("audio/v1_score.wav")}
        premountFor={fps}
        volume={(f) =>
          interpolate(f, [0, 10, durationInFrames - 45, durationInFrames - 1], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </AbsoluteFill>
  );
};
