import { AnalysisSection } from "@/components/match/AnalysisSection/AnalysisSection";
import { TableSection } from "@/components/match/TableSection/TableSection";
import { ModalManager } from "@/components/modal/ModalManager/ModalManager";

import "./MatchPage.css";

export const MatchPage = () => {
    return (
        <>
            <div className="match-page">
                <TableSection />

                <AnalysisSection />
            </div>

            <ModalManager />
        </>
    );
};