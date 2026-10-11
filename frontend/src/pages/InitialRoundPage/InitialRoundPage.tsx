import { useAppStore } from "@/store/appStore";
import { useInitialRoundStore } from "@/store/initialRoundStore";
import { useMatchStore } from "@/store/matchStore";
import { createInitializeRoundEvent } from "@/utils/event/createInitializeRoundEvent";
import { DepositSection } from "@/components/initial-round/DepositSection";
import { DoraSection } from "@/components/initial-round/DoraSection";
import { HandSection } from "@/components/initial-round/HandSection";
import { PlayerSection } from "@/components/initial-round/PlayerSection";
import { RoundSection } from "@/components/initial-round/RoundSection";

import "./InitialRoundPage.css";

export const InitialRoundPage = () => {
    
    const setCurrentPage = 
        useAppStore(
            (state) => state.setCurrentPage,
        );

    const initialRoundState =
        useInitialRoundStore(
            (state) => state.state,
        );

    const initializeRound =
        useMatchStore(
            (state) => state.initializeRound,
        );

    return (
        <div className="initial-round-page">
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
                            initialRoundState,
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