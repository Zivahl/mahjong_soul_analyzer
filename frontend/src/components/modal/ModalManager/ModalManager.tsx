import { useState } from "react";

import { ActionModal } from "@/components/modal/ActionModal/ActionModal";
import { PonModal } from "@/components/modal/PonModal/PonModal";
import { ChiModal } from "@/components/modal/ChiModal/ChiModal";

import { useActionModalStore } from "@/store/actionModalStore";

import type { MeldChoicePattern } from "@/types/analysis";


const DUMMY_PON_PATTERNS: MeldChoicePattern[] = [
    {
        id: "normal",
        tiles: [
            {
                tile: "5m",
            },
            {
                tile: "5m",
            },
            {
                tile: "5m",
                sideways: true,
            },
        ],
        from: "kamicha",
    },
    {
        id: "red",
        tiles: [
            {
                tile: "5m",
            },
            {
                tile: "5m",
            },
            {
                tile: "5mr",
                sideways: true,
            },
        ],
        from: "shimocha",
    },
];


const DUMMY_CHI_PATTERNS: MeldChoicePattern[] = [
    {
        id: "normal_35",
        tiles: [
            {
                tile: "4m",
                sideways: true,
            },
            {
                tile: "3m",
            },
            {
                tile: "5m",
            },
        ],
        from: "kamicha",
    },
    {
        id: "red_35",
        tiles: [
            {
                tile: "4m",
                sideways: true,
            },
            {
                tile: "3m",
            },
            {
                tile: "5mr",
            },
        ],
        from: "kamicha",
    },
    {
        id: "normal_56",
        tiles: [
            {
                tile: "4m",
                sideways: true,
            },
            {
                tile: "5m",
            },
            {
                tile: "6m",
            },
        ],
        from: "kamicha",
    },
    {
        id: "red_56",
        tiles: [
            {
                tile: "4m",
                sideways: true,
            },
            {
                tile: "5mr",
            },
            {
                tile: "6m",
            },
        ],
        from: "kamicha",
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


    const [selectedPatternId, setSelectedPatternId] =
        useState("normal");


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
                    selectedPatternId={
                        selectedPatternId
                    }
                    onSelect={
                        setSelectedPatternId
                    }
                    onConfirm={() => {
                        console.log(
                            selectedPatternId,
                        );

                        close();
                    }}
                    onCancel={close}
                />
            );


        case "chi":
            return (
                <ChiModal
                    patterns={
                        DUMMY_CHI_PATTERNS
                    }
                    selectedPatternId={
                        selectedPatternId
                    }
                    onSelect={
                        setSelectedPatternId
                    }
                    onConfirm={() => {
                        console.log(
                            selectedPatternId,
                        );

                        close();
                    }}
                    onCancel={close}
                />
            );


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