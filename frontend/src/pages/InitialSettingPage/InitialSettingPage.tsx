import { DepositSection } from "../../components/initial-setting/DepositSection";
import { DoraSection } from "../../components/initial-setting/DoraSection";
import { HandSection } from "../../components/initial-setting/HandSection";
import { RoundSection } from "../../components/initial-setting/RoundSection";
import { ScoreSection } from "../../components/initial-setting/ScoreSection";
import "./InitialSettingPage.css";

export const InitialSettingPage = () => {
  return (
    <div className="initial-setting-page">

      <div className="initial-grid">

        <RoundSection />

        <ScoreSection />

        <DoraSection />

        <DepositSection />

      </div>

      <HandSection />

      <button className="complete-button">
        設定完了
      </button>

    </div>
  );
};
