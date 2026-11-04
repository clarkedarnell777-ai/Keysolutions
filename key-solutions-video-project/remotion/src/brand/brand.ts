import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Key Solutions Real Estate — shared brand system for all seven videos.
export const COLORS = {
  black: "#0B0B0C",
  charcoal: "#17171A",
  white: "#F7F5F0",
  softWhite: "rgba(247,245,240,0.86)",
  gold: "#B8975A", // muted gold
  goldLight: "#D6BE8E",
  goldDeep: "#8C7142",
} as const;

export const FONTS = {
  serif: "Playfair Display",
  sans: "Montserrat",
} as const;

// Vertical (1080x1920) safe zones from the production brief.
export const SAFE = { top: 150, bottom: 170, side: 60 } as const;
// Minimum sizes from the brief: headline 56, body 36, label 28.
export const TYPE = { headline: 88, headlineSm: 64, body: 44, label: 30 } as const;

export const BRAND = {
  name: "Key Solutions Real Estate",
  website: "keysolutionsfl.com",
  identity: "Licensed Florida Realtor",
  tagline: "Building California–Florida Connections",
  disclosure: "Filmed at a past open house hosted by another agent. Not an active listing.",
} as const;

export const fontsReady = Promise.all([
  loadFont({ family: FONTS.serif, url: staticFile("fonts/playfair-display-latin-600-normal.woff2"), weight: "600" }),
  loadFont({ family: FONTS.serif, url: staticFile("fonts/playfair-display-latin-700-normal.woff2"), weight: "700" }),
  loadFont({ family: FONTS.serif, url: staticFile("fonts/playfair-display-latin-400-italic.woff2"), weight: "400", style: "italic" }),
  loadFont({ family: FONTS.sans, url: staticFile("fonts/montserrat-latin-400-normal.woff2"), weight: "400" }),
  loadFont({ family: FONTS.sans, url: staticFile("fonts/montserrat-latin-500-normal.woff2"), weight: "500" }),
  loadFont({ family: FONTS.sans, url: staticFile("fonts/montserrat-latin-600-normal.woff2"), weight: "600" }),
]);
