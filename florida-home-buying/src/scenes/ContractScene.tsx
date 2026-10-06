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

const ContractCard: React.FC<{
  readonly title: string;
  readonly note: string;
  readonly delay: number;
  readonly highlight?: number;
}> = ({ title, note, delay, highlight = 0 }) => {
  const card = useEnter(delay);
  const lines = useEnter(delay + 6, 30);
  return (
    <div
      style={{
        ...enter(card, 60),
        flex: 1,
        position: "relative",
        borderRadius: 28,
        padding: 32,
        backgroundColor: COLORS.card,
        border: `3px solid ${COLORS.faint}`,
        boxShadow: `0 0 0 ${interpolate(highlight, [0, 1], [0, 6])}px ${COLORS.accent}`,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <svg width={120} height={84} viewBox="0 0 120 84">
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={6}
            x2={i === 2 ? 70 : 114}
            y1={12 + i * 30}
            y2={12 + i * 30}
            stroke={i === 0 ? COLORS.accent : COLORS.faint}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={lines > 0 ? 1 : 0}
            {...drawProps(lines)}
          />
        ))}
      </svg>
      <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>
        {title}
      </div>
      <div
        style={{
          fontSize: FONT.label,
          fontWeight: 400,
          color: COLORS.muted,
          lineHeight: 1.3,
        }}
      >
        {note}
      </div>
    </div>
  );
};

// Quadratic bezier for the coin's arc into the vault.
const P0 = { x: 140, y: 60 };
const P1 = { x: 420, y: -40 };
const P2 = { x: 690, y: 210 };
const bezier = (t: number) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
});

const ContractSceneInner: React.FC<Props> = ({ headline, body, style }) => {
  const highlight = useEnter(62);
  const badge = useEnter(68);
  const vault = useEnter(70, 36);
  const path = useEnter(80, 30);
  const coinIn = useEnter(84);
  const drop = useEnter(92, 34);
  const pos = bezier(drop);
  const landed = useEnter(124);

  return (
    <SceneFrame style={style}>
      <SceneHeader step={2} headline={headline} body={body} />

      <div style={{ display: "flex", gap: 28, marginTop: 56, position: "relative" }}>
        <ContractCard
          title="Standard"
          note="Seller repairs up to a set limit"
          delay={34}
        />
        <ContractCard
          title={'"AS IS"'}
          note="No repairs; buyer can cancel in inspection"
          delay={44}
          highlight={highlight}
        />
        <div
          style={{
            position: "absolute",
            right: 24,
            top: -24,
            opacity: badge,
            scale: interpolate(badge, [0, 1], [0.6, 1]),
            backgroundColor: COLORS.accent,
            borderRadius: 999,
            padding: "6px 20px",
            fontSize: FONT.label - 2,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          POPULAR
        </div>
      </div>

      {/* Deposit → escrow vault */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={920} height={360} viewBox="0 -60 920 360" style={{ overflow: "visible" }}>
          <path
            d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth={4}
            strokeDasharray="1"
            opacity={path > 0 ? 0.6 : 0}
            pathLength={1}
            strokeDashoffset={1 - path}
          />
          {/* Vault */}
          <g opacity={vault > 0 ? 1 : 0}>
            <rect
              x={590}
              y={110}
              width={260}
              height={190}
              rx={28}
              fill={COLORS.card}
              stroke={COLORS.text}
              strokeWidth={5}
              {...drawProps(vault)}
            />
            <rect
              x={650}
              y={128}
              width={80}
              height={12}
              rx={6}
              fill={COLORS.text}
              opacity={vault}
            />
            <circle
              cx={720}
              cy={215}
              r={40}
              fill="none"
              stroke={landed > 0 ? COLORS.success : COLORS.text}
              strokeWidth={5}
              {...drawProps(vault)}
            />
            <line
              x1={720}
              y1={215}
              x2={720}
              y2={185}
              stroke={landed > 0 ? COLORS.success : COLORS.text}
              strokeWidth={6}
              strokeLinecap="round"
              opacity={vault}
              transform={`rotate(${interpolate(landed, [0, 1], [0, 270])} 720 215)`}
            />
            <text
              x={720}
              y={340}
              textAnchor="middle"
              fill={COLORS.text}
              fontSize={34}
              fontWeight={800}
              letterSpacing={4}
              opacity={vault}
            >
              ESCROW
            </text>
          </g>
          {/* Coin */}
          <g
            opacity={coinIn * interpolate(drop, [0.85, 1], [1, 0], { extrapolateLeft: "clamp" })}
            transform={`translate(${pos.x} ${pos.y})`}
          >
            <circle r={46} fill={COLORS.success} />
            <text
              y={16}
              textAnchor="middle"
              fill={COLORS.bg}
              fontSize={46}
              fontWeight={800}
            >
              $
            </text>
          </g>
          <text
            x={P0.x}
            y={150}
            textAnchor="middle"
            fill={COLORS.muted}
            fontSize={FONT.label}
            fontWeight={600}
            opacity={coinIn}
          >
            Deposit
          </text>
        </svg>
      </div>

      <StatCounter
        value={3}
        start={118}
        end={146}
        suffix=" days"
        label="to deliver your escrow deposit"
        color={COLORS.accent}
      />
    </SceneFrame>
  );
};

const schema = {
  headline: { type: "text-content", default: "", description: "Headline" },
  body: { type: "text-content", default: "", description: "Explanation" },
} as const satisfies InteractivitySchema;

export const ContractScene = Interactive.withSchema({
  Component: ContractSceneInner,
  componentName: "<ContractScene>",
  schema,
  wrapInSequence: true,
});
