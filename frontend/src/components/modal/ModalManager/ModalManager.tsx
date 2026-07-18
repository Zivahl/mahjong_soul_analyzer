import { ActionModal } from "@/components/modal/ActionModal/ActionModal";
import { PonModal } from "@/components/modal/PonModal/PonModal";

import { useActionModalStore } from "@/store/actionModalStore";

import type { MeldChoicePattern } from "@/types/analysis";

const DUMMY_PON_PATTERNS: MeldChoicePattern[] = [
    {
        id: "normal",
        tiles: [
            "5m",
            "5m",
            "5m",
        ],
        sidewaysTileIndex: 2,
    },
    {
        id: "red",
        tiles: [
            "5m",
            "5m",
            "5mr",
        ],
        sidewaysTileIndex: 2,
    },
];

export const ModalManager = () => {
    const request =
        useActionModalStore(
            (state) => state.request,
        );

    const close =
        useActionModalStore(
            (state) => state.close,
        );

    if (!request) {
        return null;
    }

    switch (request.action) {
        case "pon":
            return (
                <PonModal
                    patterns={
                        DUMMY_PON_PATTERNS
                    }
                    onConfirm={(
                        pattern,
                    ) => {
                        console.log(
                            pattern,
                        );

                        close();
                    }}
                    onCancel={close}
                />
            );

        case "chi":
        case "kan":
        case "ron":
        case "tsumo":
            return (
                <ActionModal
                    action={request.action}
                    onClose={close}
                />
            );

        default:
            return null;
    }
};