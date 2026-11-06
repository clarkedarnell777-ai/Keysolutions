import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../anim";
import data from "../captions.json";
import { C, CAPTION_ZONE, SAFE, SANS } from "../theme";

type Word = { text: string; startMs: number; endMs: number };
type Page = { startMs: number; endMs: number; words: Word[] };
const pages = (data as { pages: Page[] }).pages;

/** Burned-in captions synced to the narration's word timings; active word in key gold. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const page = pages.find((p) => ms >= p.startMs && ms < p.endMs);
  if (!page) return null;
  const pop = interpolate(ms - page.startMs, [0, 120], [0.92, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top: CAPTION_ZONE.top,
        height: CAPTION_ZONE.bottom - CAPTION_ZONE.top,
        left: SAFE.left,
        width: SAFE.width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          scale: pop,
          background: "rgba(21,28,53,0.82)",
          border: "1px solid rgba(216,182,106,0.35)",
          borderRadius: 24,
          padding: "14px 30px",
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 50,
          lineHeight: 1.2,
          color: C.cream,
          textAlign: "center",
          maxWidth: SAFE.width,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        {page.words.map((w, i) => {
          const active = ms >= w.startMs && ms < (page.words[i + 1]?.startMs ?? page.endMs);
          return (
            <span key={w.startMs} style={{ color: active ? C.gold : C.cream }}>
              {w.text}
              {i < page.words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};
