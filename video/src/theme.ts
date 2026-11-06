import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts are bundled locally (Fontsource, SIL Open Font License) so renders work offline.
export const SANS = "Poppins";
export const SERIF = "Tinos";

for (const weight of ["400", "500", "600", "700"]) {
  loadFont({ family: SANS, url: staticFile(`fonts/poppins-latin-${weight}-normal.woff2`), weight });
}
for (const weight of ["400", "700"]) {
  loadFont({ family: SERIF, url: staticFile(`fonts/tinos-latin-${weight}-normal.woff2`), weight });
}

// Sampled from the Key Solutions brand banner
export const C = {
  night: "#151C35",
  navy900: "#1B2342",
  navy: "#242E55",
  water: "#283760",
  gold: "#D8B66A",
  glow: "#F5D08C",
  cream: "#F4F1E8",
  mist: "#D9DCEA",
  mauve: "#80606D",
  sand: "#B48F57",
  green: "#3CC48F",
  amber: "#E8A33D",
  surface: "#FFFFFF",
  surface2: "#F3F4F8",
  ink: "#1B2342",
  muted: "#5E6685",
  line: "#E1E4EE",
} as const;

export const VIDEO = { width: 1080, height: 1920, fps: 30 } as const;

// Safe zone: 150px top, 170px bottom, 60px sides
export const SAFE = { top: 150, bottom: 1750, left: 60, right: 1020, width: 960 } as const;
// Bottom band reserved for burned-in captions and small labels
export const CAPTION_ZONE = { top: 1490, bottom: 1660 } as const;
export const LABEL_Y = 1690;

export const TRANSITION_FRAMES = 12;

// Visible length of each scene in frames (sums to 1800 = 60 s)
export const SCENE_FRAMES = [198, 282, 348, 300, 330, 342] as const;
// Absolute start frame of each scene
export const SCENE_STARTS = SCENE_FRAMES.reduce<number[]>(
  (acc, _f, i) => [...acc, i === 0 ? 0 : acc[i - 1] + SCENE_FRAMES[i - 1]],
  [],
);
// Voice-over delay (frames) after each scene start
export const VO_OFFSETS = [0, 6, 6, 6, 6, 6] as const;
