import { MainLayout } from "@/layouts/MainLayout/MainLayout";

import { InitialSettingPage } from "@/pages/InitialSettingPage/InitialSettingPage";
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
                <InitialSettingPage />
            )}

            {currentPage === "match" && (
                <MatchPage />
            )}
        </MainLayout>
    );
};