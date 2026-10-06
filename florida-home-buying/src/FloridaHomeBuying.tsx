import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { useVideoConfig } from "remotion";
import { ClearToCloseScene } from "./scenes/ClearToCloseScene";
import { ContractScene } from "./scenes/ContractScene";
import { InspectionScene } from "./scenes/InspectionScene";
import { KeysScene } from "./scenes/KeysScene";
import { PreApprovalScene } from "./scenes/PreApprovalScene";

// 5 scenes (948 frames) − 4 × 12-frame fades = 900 frames = 30s @ 30fps.
export const FloridaHomeBuying = () => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="1 · Pre-approval" durationInFrames={190} premountFor={fps}>
        <PreApprovalScene
          headline="Know your budget"
          body="A lender checks your income, credit and savings, then issues a pre-approval letter sellers expect to see."
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="2 · Contract" durationInFrames={190} premountFor={fps}>
        <ContractScene
          headline="Sign the contract"
          body="Most Florida deals use the FR/BAR contract: Standard or AS IS. Your escrow deposit is due fast."
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="3 · Inspection" durationInFrames={190} premountFor={fps}>
        <InspectionScene
          headline="Inspect everything"
          body="Insurers often require a 4-Point and Wind Mitigation inspection. The lender orders an appraisal."
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="4 · Clear to close" durationInFrames={190} premountFor={fps}>
        <ClearToCloseScene
          headline="Clear to close"
          body="A title company checks public records, you lock in insurance, and the lender signs off."
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="5 · Keys" durationInFrames={188} premountFor={fps}>
        <KeysScene
          headline="Get your keys"
          body="Sign at the title company, then file for Florida's Homestead Exemption to lower your property taxes."
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
