import { create } from "zustand";

import type {
    ModelessWindow,
    ModelessWindowInput,
} from "@/types/modeless";

interface ModelessStore {
    windows: ModelessWindow[];

    nextId: number;

    openWindow: (
        window: ModelessWindowInput,
    ) => number;

    closeWindow: (
        id: number,
    ) => void;

    closeAllWindows: () => void;
}

export const useModelessStore =
    create<ModelessStore>((set) => ({
        windows: [],

        nextId: 1,

        openWindow: (window) => {
            let id = 0;

            set((store) => {
                id = store.nextId;

                return {
                    windows: [
                        ...store.windows,
                        {
                            ...window,
                            id,
                        } as ModelessWindow,
                    ],

                    nextId: id + 1,
                };
            });

            return id;
        },

        closeWindow: (id) =>
            set((store) => ({
                windows:
                    store.windows.filter(
                        (window) =>
                            window.id !== id,
                    ),
            })),

        closeAllWindows: () =>
            set({
                windows: [],
            }),
    }));