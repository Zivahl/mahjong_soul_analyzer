import { useAppStore } from "@/store/appStore";
import { DepositSection } from "@/components/initial-setting/DepositSection";
import { DoraSection } from "@/components/initial-setting/DoraSection";
import { HandSection } from "@/components/initial-setting/HandSection";
import { PlayerSection } from "@/components/initial-setting/PlayerSection";
import { RoundSection } from "@/components/initial-setting/RoundSection";

import "./InitialSettingPage.css";

export const InitialSettingPage = () => {
    
    const setCurrentPage = useAppStore(
        (state) => state.setCurrentPage,
    );

    return (
        <div className="initial-setting-page">
            <div className="initial-grid">
                <div className="column">
                    <RoundSection />

                    <div className="column-spacer" />

                    <PlayerSection />
                </div>

                <div className="column">
                    <DoraSection />

                    <div className="column-spacer" />

                    <DepositSection />
                </div>

                <div className="hand-section">
                    <HandSection />
                </div>
            </div>

            <button
                className="complete-button"
                onClick={() =>
                    setCurrentPage("match")
                }
            >
                設定完了
            </button>
        </div>
    );
};