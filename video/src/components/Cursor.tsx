import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, ease } from "../anim";

export type CursorKey = { f: number; x: number; y: number };

const posAt = (keys: CursorKey[], frame: number) => {
  if (frame <= keys[0].f) return { x: keys[0].x, y: keys[0].y };
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame <= b.f) {
      const p = interpolate(frame, [a.f, b.f], [0, 1], { ...clamp, easing: ease });
      return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p };
    }
  }
  const last = keys[keys.length - 1];
  return { x: last.x, y: last.y };
};

/** 12px white cursor with a soft glow trail and click ripples. Eased between keyframes — never teleports. */
export const Cursor: React.FC<{ keys: CursorKey[]; clicks: number[]; appearAt: number; hideAt?: number }> = ({
  keys,
  clicks,
  appearAt,
  hideAt = Infinity,
}) => {
  const frame = useCurrentFrame();
  const opacity =
    interpolate(frame, [appearAt, appearAt + 8], [0, 1], clamp) *
    interpolate(frame, [hideAt, hideAt + 8], [1, 0], clamp);
  if (opacity <= 0) return null;
  const p = posAt(keys, frame);
  const trail = [1, 2, 3, 4, 5].map((d) => ({ ...posAt(keys, frame - d * 1.5), d }));
  const pressed = clicks.some((c) => frame >= c && frame < c + 5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      {clicks.map((c) => {
        const t = frame - c;
        if (t < 0 || t > 20) return null;
        const cp = posAt(keys, c);
        const r = interpolate(t, [0, 20], [8, 60]);
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: cp.x - r,
              top: cp.y - r,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.9)",
              opacity: interpolate(t, [0, 20], [0.9, 0]),
            }}
          />
        );
      })}
      {trail.map((tp) => (
        <div
          key={tp.d}
          style={{
            position: "absolute",
            left: tp.x - 6,
            top: tp.y - 6,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "rgba(245,208,140,0.5)",
            opacity: 0.45 - tp.d * 0.08,
            filter: "blur(3px)",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: p.x - 6,
          top: p.y - 6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#FFFFFF",
          scale: pressed ? 0.75 : 1,
          boxShadow: "0 0 14px 6px rgba(255,255,255,0.55), 0 0 30px 10px rgba(216,182,106,0.35), 0 0 0 2px rgba(27,35,66,0.6)",
        }}
      />
    </div>
  );
};
