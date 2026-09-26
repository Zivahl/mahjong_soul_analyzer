import {
    useEffect,
    useState,
} from "react";

import type {
    Seat,
} from "@/types/player";

import type {
    TileId,
} from "@/types/tile";

import type { 
    MeldChoicePattern 
} from "@/types/analysis";

import {
    ActionModal,
} from "@/components/modal/ActionModal/ActionModal";

import {
    MeldChoiceModal,
} from "@/components/modal/MeldChoiceModal/MeldChoiceModal";

import {
    TsumoModal,
} from "@/components/modal/TsumoModal/TsumoModal";

import {
    DiscardModal,
} from "@/components/modal/DiscardModal/DiscardModal";

import {
    DoraModal,
} from "@/components/modal/DoraModal/DoraModal";

import {
    useMatchStore,
} from "@/store/matchStore";

import {
    createPonPatterns,
    createChiPatterns,
    createKanPatterns,
} from "@/utils/createActionPatterns";


const getModalAnchor = (
    seat: string,
) => {
    const element =
        document.querySelector(
            `.player-block[data-seat="${seat}"]`,
        );

    if (!element) {
        return;
    }

    const rect =
        element.getBoundingClientRect();

    return {
        x:
            rect.left +
            rect.width / 2,

        y:
            rect.top +
            rect.height / 2,
    };
};


export const ModalManager = () => {

    const {
        state,
        events,
        clearActionRequest,
        callTsumo,
        callDiscard,
        callMeld,
        callDora,
    } = useMatchStore();


    const actionRequest =
        state.actionRequest;


    const [
        selectedPatternId,
        setSelectedPatternId,
    ] = useState("normal");


    const [
        selectedTsumoTile,
        setSelectedTsumoTile,
    ] = useState<TileId | null>(
        null,
    );


    const [
        selectedDiscardTile,
        setSelectedDiscardTile,
    ] = useState<TileId | null>(
        null,
    );


    const [
        selectedDoraTile,
        setSelectedDoraTile,
    ] = useState<TileId | null>(
        null,
    );


    useEffect(() => {

        setSelectedPatternId(
            "normal",
        );

        setSelectedTsumoTile(
            null,
        );

        setSelectedDiscardTile(
            null,
        );

        setSelectedDoraTile(
            null,
        );

    }, [actionRequest]);


    if (!actionRequest) {
        return null;
    }


    const anchor =
        "seat" in actionRequest
            ? getModalAnchor(
                actionRequest.seat,
            )
            : getModalAnchor(
                state.currentTurn,
            );


    if (!anchor) {
        return null;
    }


    const handleCancel = () => {
        clearActionRequest();
    };


    const handleMeldConfirm = (
        seat: Seat,
        patterns: MeldChoicePattern[],
    ) => {
        const pattern =
            patterns.find(
                (pattern) =>
                    pattern.id ===
                    selectedPatternId,
            );
    
        if (!pattern) {
            return;
        }
    
        callMeld(
            seat,
            pattern.meld,
        );
    };


    switch (
        actionRequest.action
    ) {

        case "pon": {

            const patterns =
                createPonPatterns(
                    state,
                    events,
                    actionRequest.seat,
                );

            if (
                patterns.length === 0
            ) {
                return null;
            }

            return (
                <MeldChoiceModal
                    title="ポン牌設定"
                    caller={
                        actionRequest.seat
                    }
                    patterns={patterns}
                    selectedPatternId={
                        selectedPatternId
                    }
                    anchor={anchor}
                    onSelect={
                        setSelectedPatternId
                    }
                    onConfirm={() =>
                        handleMeldConfirm(
                            actionRequest.seat,
                            patterns,
                        )
                    }
                    onCancel={
                        handleCancel
                    }
                />
            );
        }


        case "chi": {

            const patterns =
                createChiPatterns(
                    state,
                    events,
                    actionRequest.seat,
                );

            if (
                patterns.length === 0
            ) {
                return null;
            }

            return (
                <MeldChoiceModal
                    title="チー牌設定"
                    caller={
                        actionRequest.seat
                    }
                    patterns={patterns}
                    selectedPatternId={
                        selectedPatternId
                    }
                    anchor={anchor}
                    onSelect={
                        setSelectedPatternId
                    }
                    onConfirm={() =>
                        handleMeldConfirm(
                            actionRequest.seat,
                            patterns,
                        )
                    }
                    onCancel={
                        handleCancel
                    }
                />
            );
        }


        case "kan": {

            const patterns =
                createKanPatterns(
                    state,
                    events,
                    actionRequest.seat,
                );

            if (
                patterns.length === 0
            ) {
                return null;
            }

            return (
                <MeldChoiceModal
                    title="カン牌設定"
                    caller={
                        actionRequest.seat
                    }
                    patterns={patterns}
                    selectedPatternId={
                        selectedPatternId
                    }
                    anchor={anchor}
                    onSelect={
                        setSelectedPatternId
                    }
                    onConfirm={() =>
                        handleMeldConfirm(
                            actionRequest.seat,
                            patterns,
                        )
                    }
                    onCancel={
                        handleCancel
                    }
                />
            );
        }


        case "tsumo":

            return (
                <TsumoModal
                    title="ツモ牌設定"
                    anchor={anchor}
                    selectedTile={
                        selectedTsumoTile
                    }
                    onSelect={
                        setSelectedTsumoTile
                    }
                    onConfirm={() => {

                        if (
                            !selectedTsumoTile
                        ) {
                            return;
                        }

                        callTsumo(
                            actionRequest.seat,
                            selectedTsumoTile,
                        );
                    }}
                    onCancel={
                        handleCancel
                    }
                />
            );


        case "discard": {

            const player =
                state.players.find(
                    (player) =>
                        player.seat ===
                        actionRequest.seat,
                );

            if (!player) {
                return null;
            }

            return (
                <DiscardModal
                    title="打牌設定"
                    anchor={anchor}
                    seat={
                        actionRequest.seat
                    }
                    hand={player.hand}
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

                        callDiscard(
                            actionRequest.seat,
                            selectedDiscardTile,
                            discardType,
                        );
                    }}
                    onCancel={
                        handleCancel
                    }
                />
            );
        }


        case "ron":

            return (
                <ActionModal
                    action="ron"
                    onClose={
                        handleCancel
                    }
                />
            );


        case "dora":

            return (
                <DoraModal
                    title="ドラ表示牌設定"
                    anchor={anchor}
                    selectedTile={
                        selectedDoraTile
                    }
                    onSelect={
                        setSelectedDoraTile
                    }
                    onConfirm={() => {

                        if (
                            !selectedDoraTile
                        ) {
                            return;
                        }

                        callDora(
                            selectedDoraTile,
                        );
                    }}
                    onCancel={
                        handleCancel
                    }
                />
            );


        default:
            return null;
    }
};