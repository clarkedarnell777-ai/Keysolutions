import type React from "react";

type IconProps = { size?: number; color?: string; strokeWidth?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const KeyIcon: React.FC<IconProps> = ({ size = 64, color = "#D8B66A", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <circle cx="7.5" cy="15.5" r="4" />
    <path d="M10.5 12.5 20 3" />
    <path d="M16.5 6.5 19 9" />
    <path d="M14 9l2 2" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const SheetIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M4 9h16M4 15h16M10 9v12" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const CopyIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </svg>
);

export const ListCheckIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="M10 6h11M10 12h11M10 18h11" />
    <path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2.5 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="M12 3.5 2.5 20h19z" />
    <path d="M12 10v4.5M12 17.2v.3" />
  </svg>
);

export const GearIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
  </svg>
);

export const WrenchIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="M14.5 6.5a4 4 0 0 0 5 5L21 10a5.5 5.5 0 0 1-7.5-7.5L12 4l2.5 2.5z" />
    <path d="M13 9 4 18a1.4 1.4 0 0 0 2 2l9-9" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
  </svg>
);

export const StoreIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="M4 10v10h16V10M3 5h18l-1.5 5h-15z" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

export const PersonIcon: React.FC<IconProps> = ({ size = 40, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const ArrowIcon: React.FC<IconProps> = ({ size = 32, color = "currentColor", strokeWidth = 2.5 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const FlagIcon: React.FC<IconProps> = ({ size = 32, color = "currentColor", strokeWidth = 2 }) => (
  <svg {...base(size)} stroke={color} strokeWidth={strokeWidth}>
    <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
  </svg>
);
