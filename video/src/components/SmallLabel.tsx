import type React from "react";
import { C, LABEL_Y, SAFE, SANS } from "../theme";

/** Small 28px disclaimer label placed below the caption band, inside the bottom safe zone. */
export const SmallLabel: React.FC<{ children: React.ReactNode; opacity?: number; top?: number }> = ({
  children,
  opacity = 1,
  top = LABEL_Y,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: SAFE.left,
      width: SAFE.width,
      textAlign: "center",
      fontFamily: SANS,
      fontSize: 28,
      lineHeight: 1.25,
      color: C.mist,
      opacity: 0.85 * opacity,
    }}
  >
    {children}
  </div>
);
