import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
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

const CheckRow: React.FC<{ readonly label: string; readonly delay: number }> = ({
  label,
  delay,
}) => {
  const row = useEnter(delay);
  const tick = useEnter(delay + 8, 20);
  return (
    <div
      style={{
        ...enter(row, 24),
        display: "flex",
        alignItems: "center",
        gap: 28,
        fontSize: 44,
        fontWeight: 600,
      }}
    >
      <svg width={64} height={64} viewBox="0 0 64 64">
        <circle
          cx={32}
          cy={32}
          r={28}
          fill={tick > 0.5 ? COLORS.success : "none"}
          fillOpacity={interpolate(tick, [0.5, 1], [0, 0.18], {
            extrapolateLeft: "clamp",
          })}
          stroke={COLORS.success}
          strokeWidth={4}
          {...drawProps(row)}
        />
        <path
          d="M19 33 L28 42 L46 23"
          fill="none"
          stroke={COLORS.success}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={tick > 0 ? 1 : 0}
          {...drawProps(tick)}
        />
      </svg>
      {label}
    </div>
  );
};

const PreApprovalSceneInner: React.FC<Props> = ({ headline, body, style }) => {
  const outline = useEnter(28, 40);
  const lines = useEnter(40, 30);
  const stamp = useEnter(78);

  return (
    <SceneFrame style={style}>
      <SceneHeader step={1} headline={headline} body={body} />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Pre-approval letter */}
        <div style={{ position: "relative", width: 640, height: 600 }}>
          <svg
            width={640}
            height={600}
            viewBox="0 0 640 600"
            style={{ position: "absolute", inset: 0 }}
          >
            <path
              d="M24 24 H520 L616 120 V576 H24 Z"
              fill={COLORS.card}
              fillOpacity={outline}
              stroke={COLORS.accent}
              strokeWidth={4}
              strokeLinejoin="round"
              {...drawProps(outline)}
            />
            <path
              d="M520 24 V120 H616"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={4}
              strokeLinejoin="round"
              {...drawProps(outline)}
            />
            {[0, 1].map((i) => (
              <line
                key={i}
                x1={72}
                x2={i === 0 ? 420 : 320}
                y1={84 + i * 40}
                y2={84 + i * 40}
                stroke={COLORS.faint}
                strokeWidth={14}
                strokeLinecap="round"
                opacity={lines > 0 ? 1 : 0}
                {...drawProps(lines)}
              />
            ))}
          </svg>
          <div
            style={{
              position: "absolute",
              left: 72,
              top: 190,
              display: "flex",
              flexDirection: "column",
              gap: 36,
            }}
          >
            <CheckRow label="Income" delay={44} />
            <CheckRow label="Credit" delay={54} />
            <CheckRow label="Savings" delay={64} />
          </div>
          {/* Stamp */}
          <div
            style={{
              position: "absolute",
              right: 64,
              bottom: 64,
              opacity: stamp,
              scale: interpolate(stamp, [0, 1], [1.8, 1]),
              rotate: "-10deg",
              border: `5px solid ${COLORS.success}`,
              color: COLORS.success,
              borderRadius: 14,
              padding: "8px 22px",
              fontSize: FONT.label + 8,
              fontWeight: 800,
              letterSpacing: 4,
            }}
          >
            APPROVED
          </div>
        </div>
      </div>

      <StatCounter
        value={400000}
        start={92}
        end={150}
        prefix="$"
        label="Example pre-approved budget"
        color={COLORS.success}
      />
    </SceneFrame>
  );
};

const schema = {
  headline: { type: "text-content", default: "", description: "Headline" },
  body: { type: "text-content", default: "", description: "Explanation" },
} as const satisfies InteractivitySchema;

export const PreApprovalScene = Interactive.withSchema({
  Component: PreApprovalSceneInner,
  componentName: "<PreApprovalScene>",
  schema,
  wrapInSequence: true,
});
