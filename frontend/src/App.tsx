import { MainLayout } from "@/layouts/MainLayout/MainLayout";

import { InitialRoundPage } from "@/pages/InitialRoundPage/InitialRoundPage";
import { MatchPage } from "@/pages/MatchPage/MatchPage";
import { StartPage } from "@/pages/StartPage/StartPage";

import { useAppStore } from "@/store/appStore";

import "./App.css";

export const App = () => {
    const currentPage =
        useAppStore(
            (state) => state.currentPage,
        );

    return (
        <MainLayout>
            {currentPage === "start" && (
                <StartPage />
            )}

            {currentPage ===
                "initialSetting" && (
                <InitialRoundPage />
            )}

            {currentPage === "match" && (
                <MatchPage />
            )}
        </MainLayout>
    );
};