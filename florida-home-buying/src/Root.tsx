import { Composition, Folder } from "remotion";
import { FloridaHomeBuying } from "./FloridaHomeBuying";
import { ClearToCloseScene } from "./scenes/ClearToCloseScene";
import { ContractScene } from "./scenes/ContractScene";
import { InspectionScene } from "./scenes/InspectionScene";
import { KeysScene } from "./scenes/KeysScene";
import { PreApprovalScene } from "./scenes/PreApprovalScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FloridaHomeBuying"
        component={FloridaHomeBuying}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Scenes">
        <Composition
          id="PreApproval"
          component={PreApprovalScene}
          durationInFrames={190}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "Know your budget",
            body: "A lender checks your income, credit and savings, then issues a pre-approval letter sellers expect to see.",
          }}
        />
        <Composition
          id="Contract"
          component={ContractScene}
          durationInFrames={190}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "Sign the contract",
            body: "Most Florida deals use the FR/BAR contract: Standard or AS IS. Your escrow deposit is due fast.",
          }}
        />
        <Composition
          id="Inspection"
          component={InspectionScene}
          durationInFrames={190}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "Inspect everything",
            body: "Insurers often require a 4-Point and Wind Mitigation inspection. The lender orders an appraisal.",
          }}
        />
        <Composition
          id="ClearToClose"
          component={ClearToCloseScene}
          durationInFrames={190}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "Clear to close",
            body: "A title company checks public records, you lock in insurance, and the lender signs off.",
          }}
        />
        <Composition
          id="Keys"
          component={KeysScene}
          durationInFrames={188}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            headline: "Get your keys",
            body: "Sign at the title company, then file for Florida's Homestead Exemption to lower your property taxes.",
          }}
        />
      </Folder>
    </>
  );
};
