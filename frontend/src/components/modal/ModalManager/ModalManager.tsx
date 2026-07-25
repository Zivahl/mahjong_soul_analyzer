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
        discardTile,
        openAction,
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
                    anchor={
                        request.anchor
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
                    anchor={
                        request.anchor
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
                    anchor={
                        request.anchor
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
        
                        openAction({
                            seat: request.seat,
                            action: "discard",
                            anchor:
                                request.anchor,
                        });
                    }}       
                    onCancel={closeAction}
                />
            );

        case "discard":
            return (
                <DiscardModal
                    title="打牌設定"
        
                    anchor={
                        request.anchor
                    }
        
                    hand={
                        player.hand
                    }
        
                    tsumoTile={
                        state.currentTsumo
                    }
        
                    selectedTile={
                        selectedDiscardTile
                    }
        
                    onSelect={
                        setSelectedDiscardTile
                    }

                    onConfirm={(
                        discardType,
                    ) => {
                        if (
                            !selectedDiscardTile
                        ) {
                            return;
                        }
                    
                        discardTile(
                            request.seat,
                            selectedDiscardTile,
                            discardType,
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