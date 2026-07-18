import { create } from "zustand";

import type { PlayerActionRequest } from "@/types/analysis";

interface ActionModalStore {
    request: PlayerActionRequest | null;

    open: (
        request: PlayerActionRequest,
    ) => void;

    close: () => void;
}

export const useActionModalStore =
    create<ActionModalStore>((set) => ({
        request: null,

        open: (request) =>
            set({
                request,
            }),

        close: () =>
            set({
                request: null,
            }),
    }));