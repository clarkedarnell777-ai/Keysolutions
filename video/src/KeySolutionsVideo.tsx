import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { Captions } from "./components/Captions";
import { Scene1Problem } from "./scenes/Scene1Problem";
import { Scene2Intro } from "./scenes/Scene2Intro";
import { Scene3Demo } from "./scenes/Scene3Demo";
import { Scene4Applications } from "./scenes/Scene4Applications";
import { Scene5ProsCons } from "./scenes/Scene5ProsCons";
import { Scene6Offer } from "./scenes/Scene6Offer";
import { C, SCENE_STARTS, TRANSITION_FRAMES, VO_OFFSETS } from "./theme";

const VO_END = 1742; // last narration frame (scene 6 start + offset + clip length)

export const KeySolutionsVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const fadeTiming = linearTiming({ durationInFrames: TRANSITION_FRAMES });

  return (
    <AbsoluteFill style={{ background: C.night }}>
      {/* Each sequence runs TRANSITION_FRAMES longer so the crossfade keeps scene starts on the VO cues. */}
      <TransitionSeries>
        <TransitionSeries.Sequence name="1 · Problem" durationInFrames={198 + TRANSITION_FRAMES} premountFor={fps}>
          <Scene1Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence name="2 · Key Solutions" durationInFrames={282 + TRANSITION_FRAMES} premountFor={fps}>
          <Scene2Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence name="3 · Real estate demo" durationInFrames={348 + TRANSITION_FRAMES} premountFor={fps}>
          <Scene3Demo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence name="4 · Applications" durationInFrames={300 + TRANSITION_FRAMES} premountFor={fps}>
          <Scene4Applications />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence name="5 · Pros & cons" durationInFrames={330 + TRANSITION_FRAMES} premountFor={fps}>
          <Scene5ProsCons />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence name="6 · Offer + CTA" durationInFrames={342} premountFor={fps}>
          <Scene6Offer />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence name="Captions">
        <Captions />
      </Sequence>

      {/* Narration: Deepgram Aura-2 "Orion" via Speko TTS */}
      <Audio name="VO 1" src={staticFile("vo/vo1.mp3")} from={SCENE_STARTS[0] + VO_OFFSETS[0]} premountFor={fps} />
      <Audio name="VO 2" src={staticFile("vo/vo2.mp3")} from={SCENE_STARTS[1] + VO_OFFSETS[1]} premountFor={fps} />
      <Audio name="VO 3" src={staticFile("vo/vo3.mp3")} from={SCENE_STARTS[2] + VO_OFFSETS[2]} premountFor={fps} />
      <Audio name="VO 4" src={staticFile("vo/vo4.mp3")} from={SCENE_STARTS[3] + VO_OFFSETS[3]} premountFor={fps} />
      <Audio name="VO 5" src={staticFile("vo/vo5.mp3")} from={SCENE_STARTS[4] + VO_OFFSETS[4]} premountFor={fps} />
      <Audio name="VO 6" src={staticFile("vo/vo6.mp3")} from={SCENE_STARTS[5] + VO_OFFSETS[5]} premountFor={fps} />

      {/* Original synthesized music bed, ducked under narration */}
      <Audio
        name="Music"
        src={staticFile("music.mp3")}
        volume={(f) => interpolate(f, [0, VO_END, VO_END + 12], [0.16, 0.16, 0.38], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};
