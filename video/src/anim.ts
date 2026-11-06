import { spring, interpolate, Easing, type SpringConfig } from "remotion";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const springIn = (
  frame: number,
  fps: number,
  delay = 0,
  config: Partial<SpringConfig> = { damping: 14, stiffness: 120, mass: 0.8 },
) => spring({ frame: frame - delay, fps, config });

export const fadeUp = (frame: number, fps: number, delay = 0, distance = 40) => {
  const s = springIn(frame, fps, delay, { damping: 200 });
  return {
    opacity: s,
    translate: `0px ${interpolate(s, [0, 1], [distance, 0])}px`,
  } as const;
};

export const ease = Easing.bezier(0.45, 0, 0.2, 1);

export const typewriter = (text: string, frame: number, start: number, charsPerFrame: number) => {
  const n = Math.max(0, Math.floor((frame - start) * charsPerFrame));
  return text.slice(0, Math.min(text.length, n));
};
