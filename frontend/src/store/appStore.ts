import { create } from "zustand";

import type { AppPage } from "@/types/app";

interface AppStore {
    currentPage: AppPage;

    setCurrentPage: (
        page: AppPage,
    ) => void;
}

export const useAppStore =
    create<AppStore>((set) => ({
        currentPage: "start",

        setCurrentPage: (page) =>
            set({
                currentPage: page,
            }),
    }));