import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
import {
  COLORS,
  drawProps,
  enter,
  FONT,
  SceneFrame,
  SceneHeader,
  useEnter,
} from "../theme";

type Props = {
  readonly headline: string;
  readonly body: string;
  readonly style?: React.CSSProperties;
};

const ICONS: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx={20} cy={20} r={11} />
      <path d="M28 28 L37 37" />
    </>
  ),
  doc: (
    <>
      <path d="M11 6 H27 L33 12 V38 H11 Z" />
      <path d="M17 20 H27 M17 27 H27" />
    </>
  ),
  umbrella: (
    <>
      <path d="M6 22 Q22 2 38 22 Z" />
      <path d="M22 22 V34 Q22 39 17 37" />
    </>
  ),
  bank: (
    <>
      <path d="M6 16 L22 6 L38 16 Z" />
      <path d="M11 20 V32 M22 20 V32 M33 20 V32 M6 37 H38" />
    </>
  ),
};

const NODE = 120;

const FlowNode: React.FC<{
  readonly icon: keyof typeof ICONS;
  readonly title: string;
  readonly note: string;
  readonly delay: number;
}> = ({ icon, title, note, delay }) => {
  const p = useEnter(delay);
  const ring = useEnter(delay, 26);
  const glyph = useEnter(delay + 6, 26);
  return (
    <div style={{ ...enter(p, 30), display: "flex", alignItems: "center", gap: 32 }}>
      <svg width={NODE} height={NODE} viewBox="0 0 96 96" style={{ flexShrink: 0 }}>
        <circle
          cx={48}
          cy={48}
          r={44}
          fill="rgba(99,102,241,0.15)"
          stroke={COLORS.accent}
          strokeWidth={4}
          {...drawProps(ring)}
        />
        <g
          transform="translate(26 26)"
          fill="none"
          stroke={COLORS.text}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={glyph}
        >
          {ICONS[icon]}
        </g>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>
          {title}
        </div>
        <div style={{ fontSize: FONT.label + 6, color: COLORS.muted }}>
          {note}
        </div>
      </div>
    </div>
  );
};

const Connector: React.FC<{ readonly delay: number }> = ({ delay }) => {
  const p = useEnter(delay, 18);
  return (
    <svg width={NODE} height={64} viewBox="0 0 96 44" preserveAspectRatio="none">
      <path
        d="M48 2 V34 M40 26 L48 34 L56 26"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={p > 0 ? 1 : 0}
        {...drawProps(p)}
      />
    </svg>
  );
};

const ClearToCloseSceneInner: React.FC<Props> = ({ headline, body, style }) => {
  const badge = useEnter(124);
  const shield = useEnter(128, 30);
  const check = useEnter(146, 18);

  return (
    <SceneFrame style={style}>
      <SceneHeader step={4} headline={headline} body={body} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 20,
        }}
      >
        <FlowNode icon="search" title="Title search" note="Liens, ownership, permits" delay={30} />
        <Connector delay={44} />
        <FlowNode icon="doc" title="Title insurance" note="Protects your ownership" delay={52} />
        <Connector delay={66} />
        <FlowNode icon="umbrella" title="Home + flood policy" note="Bound before closing" delay={74} />
        <Connector delay={88} />
        <FlowNode icon="bank" title="Underwriting" note="Lender's final approval" delay={96} />
        <Connector delay={110} />

        <div
          style={{
            opacity: badge,
            scale: interpolate(badge, [0, 1], [0.85, 1]),
            display: "flex",
            alignItems: "center",
            gap: 28,
            padding: "26px 36px",
            marginTop: 8,
            borderRadius: 28,
            backgroundColor: "rgba(34,197,94,0.14)",
            border: `4px solid ${COLORS.success}`,
          }}
        >
          <svg width={84} height={96} viewBox="0 0 84 96">
            <path
              d="M42 6 L76 18 V46 Q76 76 42 90 Q8 76 8 46 V18 Z"
              fill="none"
              stroke={COLORS.success}
              strokeWidth={6}
              strokeLinejoin="round"
              {...drawProps(shield)}
            />
            <path
              d="M27 48 L38 59 L58 37"
              fill="none"
              stroke={COLORS.success}
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={check > 0 ? 1 : 0}
              {...drawProps(check)}
            />
          </svg>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              letterSpacing: 1,
              color: COLORS.success,
            }}
          >
            CLEAR TO CLOSE
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

const schema = {
  headline: { type: "text-content", default: "", description: "Headline" },
  body: { type: "text-content", default: "", description: "Explanation" },
} as const satisfies InteractivitySchema;

export const ClearToCloseScene = Interactive.withSchema({
  Component: ClearToCloseSceneInner,
  componentName: "<ClearToCloseScene>",
  schema,
  wrapInSequence: true,
});
