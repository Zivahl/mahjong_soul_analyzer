import { useEffect, useState } from "react";

import type { TileId } from "@/types/tile";

import { ActionModal } from "@/components/modal/ActionModal/ActionModal";
import { TsumoModal } from "@/components/modal/TsumoModal/TsumoModal";
import { PonModal } from "@/components/modal/PonModal/PonModal";
import { ChiModal } from "@/components/modal/ChiModal/ChiModal";
import { DiscardModal } from "@/components/modal/DiscardModal/DiscardModal";

import { useMatchStore } from "@/store/matchStore";

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

    const {
        state,
        closeAction,
        setCurrentTsumo,
    } = useMatchStore();


    const request =
        state.pendingAction;


    const [selectedPatternId, setSelectedPatternId] =
        useState("normal");


    const [
        selectedTsumoTile,
        setSelectedTsumoTile,
    ] = useState<TileId | null>(null);


    const [
        selectedDiscardTile,
        setSelectedDiscardTile,
    ] = useState<TileId | null>(null);


    useEffect(() => {
        if (!request) {
            setSelectedPatternId("normal");
            setSelectedTsumoTile(null);
            setSelectedDiscardTile(null);
        }
    }, [request]);

    if (!request) {
        return null;
    }


    const player =
    state.players.find(
        (player) =>
            player.seat ===
            request.seat,
    );

    if (!player) {
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
                    placement={
                        request.placement
                    }
                    onSelect={
                        setSelectedPatternId
                    }
                    onConfirm={() => {
                        console.log(
                            selectedPatternId,
                        );

                        closeAction();
                    }}
                    onCancel={closeAction}
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
                    placement={
                        request.placement
                    }
                    onSelect={
                        setSelectedPatternId
                    }
                    onConfirm={() => {
                        console.log(
                            selectedPatternId,
                        );

                        closeAction();
                    }}
                    onCancel={closeAction}
                />
            );

        case "tsumo":
            return (
                <TsumoModal
                    placement={
                        request.placement
                    }       
                    selectedTile={
                        selectedTsumoTile
                    }       
                    onSelect={
                        setSelectedTsumoTile
                    }
                    onConfirm={() => {
                        if (
                            selectedTsumoTile
                        ) {
                            setCurrentTsumo(
                                selectedTsumoTile,
                            );
                        }
        
                        closeAction();
                    }}       
                    onCancel={closeAction}
                />
            );

        case "discard":
            return (
                <DiscardModal
                    title="打牌設定"
        
                    placement={
                        request.placement
                    }
        
                    hand={
                        player.hand
                    }
        
                    tsumoTile={
                        undefined
                    }
        
                    selectedTile={
                        selectedDiscardTile
                    }
        
                    onSelect={
                        setSelectedDiscardTile
                    }
                    // TODO:
                    // 選択した打牌を確定して解析結果へ反映
                    onConfirm={() => {
        
                        console.log(
                            selectedDiscardTile,
                        );
        
                        closeAction();
                    }}
        
                    onCancel={closeAction}
                />
            );

        case "kan":
        case "ron":
            return (
                <ActionModal
                    action={request.action}
                    onClose={closeAction}
                />
            );

        default:
            return null;
    }
};