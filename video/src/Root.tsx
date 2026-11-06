import type React from "react";
import { Composition, Folder, Still } from "remotion";
import { KeySolutionsVideo } from "./KeySolutionsVideo";
import { Scene1Problem } from "./scenes/Scene1Problem";
import { Scene2Intro } from "./scenes/Scene2Intro";
import { Scene3Demo } from "./scenes/Scene3Demo";
import { Scene4Applications } from "./scenes/Scene4Applications";
import { Scene5ProsCons } from "./scenes/Scene5ProsCons";
import { Scene6Offer } from "./scenes/Scene6Offer";
import { Thumbnail } from "./Thumbnail";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KeySolutionsAIAutomation"
        component={KeySolutionsVideo}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
      <Still id="Thumbnail" component={Thumbnail} width={1080} height={1920} />
      <Folder name="Scenes">
        <Composition id="Scene1-Problem" component={Scene1Problem} durationInFrames={210} fps={30} width={1080} height={1920} />
        <Composition id="Scene2-Intro" component={Scene2Intro} durationInFrames={294} fps={30} width={1080} height={1920} />
        <Composition id="Scene3-Demo" component={Scene3Demo} durationInFrames={360} fps={30} width={1080} height={1920} />
        <Composition id="Scene4-Applications" component={Scene4Applications} durationInFrames={312} fps={30} width={1080} height={1920} />
        <Composition id="Scene5-ProsCons" component={Scene5ProsCons} durationInFrames={342} fps={30} width={1080} height={1920} />
        <Composition id="Scene6-Offer" component={Scene6Offer} durationInFrames={342} fps={30} width={1080} height={1920} />
      </Folder>
    </>
  );
};
