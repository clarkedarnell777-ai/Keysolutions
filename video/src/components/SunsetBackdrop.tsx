import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { clamp } from "../anim";
import { C } from "../theme";

const HORIZON = 1480;

const Palm: React.FC<{ x: number; base: number; height: number; lean: number; flip?: boolean }> = ({
  x,
  base,
  height,
  lean,
  flip,
}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 40 + x) * 1.5;
  const topX = x + lean;
  const topY = base - height;
  const fronds = [-150, -115, -80, -45, -10, 25];
  return (
    <g transform={`rotate(${sway} ${x} ${base})`}>
      <path
        d={`M ${x - 7} ${base} Q ${x + lean * 0.3} ${base - height * 0.5} ${topX - 3} ${topY} L ${topX + 4} ${topY} Q ${x + lean * 0.3 + 10} ${base - height * 0.5} ${x + 9} ${base} Z`}
        fill={C.night}
      />
      {fronds.map((a) => {
        const ang = ((flip ? 180 - a : a) * Math.PI) / 180;
        const len = 150;
        const ex = topX + Math.cos(ang) * len;
        const ey = topY + Math.sin(ang) * len * 0.75 + 40;
        const cx = topX + Math.cos(ang) * len * 0.5;
        const cy = topY + Math.sin(ang) * len * 0.5 - 30;
        return <path key={a} d={`M ${topX} ${topY} Q ${cx} ${cy} ${ex} ${ey}`} stroke={C.night} strokeWidth={9} fill="none" strokeLinecap="round" />;
      })}
    </g>
  );
};

const Building: React.FC<{ x: number; w: number; h: number }> = ({ x, w, h }) => (
  <g>
    <rect x={x} y={HORIZON - h} width={w} height={h} fill={C.water} />
    {Array.from({ length: Math.floor((h - 40) / 52) }).map((_, r) =>
      Array.from({ length: Math.floor(w / 46) }).map((__, c) => (
        <rect
          key={`${r}-${c}`}
          x={x + 16 + c * 46}
          y={HORIZON - h + 26 + r * 52}
          width={18}
          height={18}
          fill="#837355"
          opacity={0.75}
        />
      )),
    )}
  </g>
);

/** Florida dusk scene rebuilt from the Key Solutions banner: navy sky, sunset glow over water, palms, skyline. */
export const SunsetBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const sunRise = interpolate(frame, [0, 120], [40, 0], clamp);
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.night} />
            <stop offset="0.45" stopColor={C.navy} />
            <stop offset="0.66" stopColor="#4A4466" />
            <stop offset="0.73" stopColor={C.mauve} />
            <stop offset="0.77" stopColor="#E8B97E" />
          </linearGradient>
          <radialGradient id="sunglow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(245,208,140,0.75)" />
            <stop offset="1" stopColor="rgba(245,208,140,0)" />
          </radialGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.water} />
            <stop offset="1" stopColor={C.navy900} />
          </linearGradient>
        </defs>
        <rect width={1080} height={HORIZON} fill="url(#sky)" />
        <circle cx={540} cy={HORIZON - 40} r={520} fill="url(#sunglow)" />
        <circle cx={540} cy={HORIZON + sunRise} r={150} fill={C.glow} />
        <rect y={HORIZON} width={1080} height={1920 - HORIZON} fill="url(#water)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={540 - (150 - i * 26) + Math.sin(frame / 12 + i) * 6}
            y={HORIZON + 26 + i * 26}
            width={(150 - i * 26) * 2}
            height={6}
            rx={3}
            fill={C.glow}
            opacity={0.7 - i * 0.12}
          />
        ))}
        <path d={`M 0 1800 Q 540 1760 1080 1800 L 1080 1920 L 0 1920 Z`} fill={C.sand} />
        <Building x={-20} w={130} h={280} />
        <Building x={100} w={90} h={190} />
        <Building x={970} w={130} h={300} />
        <Building x={890} w={90} h={200} />
        <Palm x={170} base={1830} height={380} lean={-40} />
        <Palm x={70} base={1860} height={300} lean={30} />
        <Palm x={910} base={1830} height={370} lean={40} flip />
        <Palm x={1010} base={1870} height={290} lean={-25} flip />
      </svg>
    </AbsoluteFill>
  );
};
