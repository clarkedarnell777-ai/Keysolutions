import React from "react";
import { Composition, Folder } from "remotion";
import "./brand/brand";
import { Video1 } from "./videos/Video1";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Reels-9x16">
        <Composition
          id="V1-MeetYourRealEstateConnection"
          component={Video1}
          durationInFrames={900}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
