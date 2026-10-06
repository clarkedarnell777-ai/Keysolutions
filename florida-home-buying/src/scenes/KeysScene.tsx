import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  Interactive,
  random,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import {
  COLORS,
  drawProps,
  enter,
  FONT,
  SceneFrame,
  SceneHeader,
  StatCounter,
  useEnter,
} from "../theme";

type Props = {
  readonly headline: string;
  readonly body: string;
  readonly style?: React.CSSProperties;
};

const PARTICLE_COUNT = 14;

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const fadeIn = useEnter(0, 30);
  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <svg width={width} height={height}>
        {new Array(PARTICLE_COUNT).fill(true).map((_, i) => {
          const r = 6 + random(`r${i}`) * 16;
          const speed = 2 + random(`s${i}`) * 4;
          const span = height + r * 2;
          const y = span - ((random(`y${i}`) * span + frame * speed) % span) - r;
          const x =
            random(`x${i}`) * width + Math.sin(frame / 25 + i) * 18;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={i % 3 === 0 ? COLORS.success : COLORS.accent}
              opacity={0.18 + random(`o${i}`) * 0.3}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

const KeysSceneInner: React.FC<Props> = ({ headline, body, style }) => {
  const lock = useEnter(26, 30);
  const keyDraw = useEnter(34, 30);
  const insert = useEnter(64);
  const unlock = useEnter(88);
  const chip = useEnter(100);
  const locked = unlock < 0.5;
  const lockColor = locked ? COLORS.text : COLORS.success;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Particles />
      <SceneFrame style={{ backgroundColor: "transparent", ...style }}>
        <SceneHeader step={5} headline={headline} body={body} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
        >
          <svg width={900} height={360} viewBox="0 0 900 360">
            {/* Padlock */}
            <path
              d="M650 170 V110 Q650 40 720 40 Q790 40 790 110 V170"
              fill="none"
              stroke={lockColor}
              strokeWidth={16}
              strokeLinecap="round"
              opacity={lock > 0 ? 1 : 0}
              transform={`translate(0 ${interpolate(unlock, [0, 1], [0, -36])})`}
              {...drawProps(lock)}
            />
            <rect
              x={610}
              y={160}
              width={220}
              height={180}
              rx={28}
              fill={locked ? COLORS.bg : "rgba(34,197,94,0.15)"}
              stroke={lockColor}
              strokeWidth={8}
              {...drawProps(lock)}
            />
            <circle cx={720} cy={232} r={16} fill={lockColor} opacity={lock} />
            <path d="M712 240 L728 240 L734 286 L706 286 Z" fill={lockColor} opacity={lock} />

            {/* Key */}
            <g
              transform={`translate(${interpolate(insert, [0, 1], [0, 300])} 0)`}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={keyDraw > 0 ? 1 : 0}
            >
              <circle cx={90} cy={240} r={50} {...drawProps(keyDraw)} />
              <circle cx={90} cy={240} r={14} strokeWidth={10} {...drawProps(keyDraw)} />
              <path
                d="M140 240 H420 M360 240 V282 M400 240 V270"
                {...drawProps(keyDraw)}
              />
            </g>
          </svg>

          <div
            style={{
              ...enter(chip, 30),
              padding: "14px 30px",
              borderRadius: 999,
              border: `3px solid ${COLORS.accent}`,
              backgroundColor: "rgba(99,102,241,0.15)",
              fontSize: FONT.label + 4,
              fontWeight: 600,
            }}
          >
            Closing: ~30–45 days after your offer
          </div>
        </div>

        <StatCounter
          value={50000}
          start={112}
          end={160}
          prefix="$"
          label="Max Homestead exemption · file by March 1"
          color={COLORS.success}
        />
      </SceneFrame>
    </AbsoluteFill>
  );
};

const schema = {
  headline: { type: "text-content", default: "", description: "Headline" },
  body: { type: "text-content", default: "", description: "Explanation" },
} as const satisfies InteractivitySchema;

export const KeysScene = Interactive.withSchema({
  Component: KeysSceneInner,
  componentName: "<KeysScene>",
  schema,
  wrapInSequence: true,
});
