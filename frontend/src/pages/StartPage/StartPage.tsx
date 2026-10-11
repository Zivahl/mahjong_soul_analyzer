import { useAppStore } from "@/store/appStore";
import { useMatchStore } from "@/store/matchStore";

import "./StartPage.css";

export const StartPage = () => {

    const setCurrentPage = useAppStore(
        (state) => state.setCurrentPage,
    );

    const startMatch = useMatchStore(
        (state) => state.startMatch,
    );

    const handleStart = () => {

        startMatch({
            redDora: true,
            sanma: false,
        });

        setCurrentPage(
            "initialSetting",
        );
    };

    return (
        <div className="start-page">
            <button
                className="start-button"
                onClick={handleStart}
            >
                開始
            </button>
        </div>
    );
};