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

const Chip: React.FC<{ readonly label: string; readonly delay: number }> = ({
  label,
  delay,
}) => {
  const p = useEnter(delay);
  const done = useEnter(delay + 10, 16);
  return (
    <div
      style={{
        ...enter(p, 30),
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 26px 14px 16px",
        borderRadius: 999,
        backgroundColor: done > 0.5 ? "rgba(34,197,94,0.14)" : COLORS.card,
        border: `3px solid ${done > 0.5 ? COLORS.success : COLORS.faint}`,
        fontSize: FONT.label + 4,
        fontWeight: 600,
      }}
    >
      <svg width={40} height={40} viewBox="0 0 40 40">
        <circle cx={20} cy={20} r={18} fill={COLORS.success} opacity={done} />
        <path
          d="M12 21 L18 27 L29 14"
          fill="none"
          stroke={COLORS.bg}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={done > 0 ? 1 : 0}
          {...drawProps(done)}
        />
      </svg>
      {label}
    </div>
  );
};

const InspectionSceneInner: React.FC<Props> = ({ headline, body, style }) => {
  const roof = useEnter(26, 30);
  const walls = useEnter(34, 30);
  const details = useEnter(46, 24);
  const glassIn = useEnter(52);
  const sweep = useEnter(56, 70);
  const gx = interpolate(sweep, [0, 1], [150, 470]);
  const gy = 250 + Math.sin(sweep * Math.PI * 2) * 50;

  return (
    <SceneFrame style={style}>
      <SceneHeader step={3} headline={headline} body={body} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
        }}
      >
        <svg width={620} height={420} viewBox="0 0 620 420">
          {/* Roof */}
          <path
            d="M50 200 L310 30 L570 200"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={roof > 0 ? 1 : 0}
            {...drawProps(roof)}
          />
          {/* Walls */}
          <path
            d="M110 170 V400 H510 V170"
            fill="none"
            stroke={COLORS.text}
            strokeWidth={8}
            strokeLinejoin="round"
            opacity={walls > 0 ? 1 : 0}
            {...drawProps(walls)}
          />
          {/* Door + windows */}
          <path
            d="M270 400 V290 H350 V400"
            fill="none"
            stroke={COLORS.text}
            strokeWidth={6}
            opacity={details > 0 ? 1 : 0}
            {...drawProps(details)}
          />
          {[160, 390].map((x) => (
            <rect
              key={x}
              x={x}
              y={230}
              width={70}
              height={70}
              rx={8}
              fill="none"
              stroke={COLORS.text}
              strokeWidth={6}
              opacity={details > 0 ? 1 : 0}
              {...drawProps(details)}
            />
          ))}
          {/* Magnifying glass */}
          <g opacity={glassIn} transform={`translate(${gx} ${gy})`}>
            <circle
              r={62}
              fill="rgba(99,102,241,0.18)"
              stroke={COLORS.success}
              strokeWidth={9}
            />
            <line
              x1={46}
              y1={46}
              x2={100}
              y2={100}
              stroke={COLORS.success}
              strokeWidth={16}
              strokeLinecap="round"
            />
          </g>
        </svg>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 18,
            maxWidth: 900,
          }}
        >
          <Chip label="Roof" delay={60} />
          <Chip label="HVAC" delay={70} />
          <Chip label="Electrical" delay={80} />
          <Chip label="Plumbing" delay={90} />
          <Chip label="Wind Mitigation" delay={100} />
        </div>
      </div>

      <StatCounter
        value={15}
        start={112}
        end={150}
        suffix=" days"
        label="default inspection period"
        color={COLORS.accent}
      />
    </SceneFrame>
  );
};

const schema = {
  headline: { type: "text-content", default: "", description: "Headline" },
  body: { type: "text-content", default: "", description: "Explanation" },
} as const satisfies InteractivitySchema;

export const InspectionScene = Interactive.withSchema({
  Component: InspectionSceneInner,
  componentName: "<InspectionScene>",
  schema,
  wrapInSequence: true,
});
