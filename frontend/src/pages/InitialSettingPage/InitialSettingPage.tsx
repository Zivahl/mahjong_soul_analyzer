import { DepositSection } from "@/components/initial-setting/DepositSection";
import { DoraSection } from "@/components/initial-setting/DoraSection";
import { HandSection } from "@/components/initial-setting/HandSection";
import { PlayerSection } from "@/components/initial-setting/PlayerSection";
import { RoundSection } from "@/components/initial-setting/RoundSection";

import "./InitialSettingPage.css";

export const InitialSettingPage = () => {
    return (
        <div className="initial-setting-page">
            <div className="initial-grid">
                <div className="left-column">
                    <RoundSection />
                    <PlayerSection />
                </div>
            
                <div className="right-column">
                    <DoraSection />
                    <DepositSection />
                </div>
            
            </div>

            <div className="hand-section">
                <HandSection />
            </div>

            <button className="complete-button">
                設定完了
            </button>
        </div>
    );
};