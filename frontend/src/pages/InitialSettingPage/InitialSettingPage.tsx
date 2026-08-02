import { useAppStore } from "@/store/appStore";
import { useInitialSettingStore } from "@/store/initialSettingStore";
import { useMatchStore } from "@/store/matchStore";
import { createInitializeRoundEvent } from "@/utils/createInitializeRoundEvent";
import { DepositSection } from "@/components/initial-setting/DepositSection";
import { DoraSection } from "@/components/initial-setting/DoraSection";
import { HandSection } from "@/components/initial-setting/HandSection";
import { PlayerSection } from "@/components/initial-setting/PlayerSection";
import { RoundSection } from "@/components/initial-setting/RoundSection";

import "./InitialSettingPage.css";

export const InitialSettingPage = () => {
    
    const setCurrentPage = 
        useAppStore(
            (state) => state.setCurrentPage,
        );

    const initialSettingState =
        useInitialSettingStore(
            (state) => state.state,
        );

    const initializeRound =
        useMatchStore(
            (state) => state.initializeRound,
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
                onClick={() => {
            
                    const event =
                        createInitializeRoundEvent(
                            initialSettingState,
                        );
           
                    initializeRound(
                        event,
                    );
            
                    setCurrentPage(
                        "match",
                    );
                }}
            >
                設定完了
            </button>
        </div>
    );
};