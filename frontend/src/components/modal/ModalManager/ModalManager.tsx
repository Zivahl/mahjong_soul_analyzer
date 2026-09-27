import {
    useEffect,
    useLayoutEffect,
    useState,
} from "react";

import type {
    Seat, Discard
} from "@/types/player";

import type {
    TileId,
} from "@/types/tile";

import type {
    MeldChoicePattern,
    ActionRequest,
} from "@/types/analysis";

import type {
    ModalAnchor,
} from "@/types/modal";

import {
    MeldModal,
} from "@/components/modal/MeldModal/MeldModal";

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
    createMeldPatterns,
} from "@/utils/createActionPatterns";

import {
    SEAT_LABEL,
} from "@/constants/seats";


const ACTION_LABEL = {
    tsumo: "ツモ牌設定",
    discard: "打牌設定",
    pon: "ポン牌設定",
    chi: "チー牌設定",
    kan: "カン牌設定",
    tsumohora: "ツモ和了確認",
    ronhora: "ロン和了確認",
    dora: "ドラ表示牌設定",
} as const;


const getModalTitle = (
    action: ActionRequest["action"],
    seat: Seat,
) => {
    return (
        `${ACTION_LABEL[action]}` +
        ` [${SEAT_LABEL[seat]}]`
    );
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
        anchor,
        setAnchor,
    ] = useState<ModalAnchor>();


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


    /*
     * ActionRequest が変更されたあと、
     * PlayerBlock の DOM が commit されたタイミングで
     * モーダル位置を取得する。
     *
     * render 中に document.querySelector() を実行しない。
     */
    useLayoutEffect(() => {
        if (!actionRequest) {
            setAnchor(undefined);
            return;
        }


        const seat =
            "seat" in actionRequest
                ? actionRequest.seat
                : state.currentTurn;


        const element =
            document.querySelector(
                `.player-block[data-seat="${seat}"]`,
            );


        if (!element) {
            setAnchor(undefined);
            return;
        }


        const rect =
            element.getBoundingClientRect();


        setAnchor({
            x:
                rect.left +
                rect.width / 2,

            y:
                rect.top +
                rect.height / 2,
        });
    }, [
        actionRequest,
        state.currentTurn,
    ]);


    /*
     * ActionRequest が切り替わったら、
     * 各モーダルの選択状態をリセットする。
     */
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


    /*
     * ActionRequest は存在しているが、
     * 対象 PlayerBlock の DOM がまだ取得できていない場合。
     *
     * useLayoutEffect 後の再 render で表示される。
     */
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
        case "tsumo": {
            const seat =
                actionRequest.seat;


            return (
                <TsumoModal
                    title={
                        getModalTitle(
                            "tsumo",
                            seat,
                        )
                    }
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
                            seat,
                            selectedTsumoTile,
                        );
                    }}
                    onCancel={
                        handleCancel
                    }
                />
            );
        }


        case "discard": {
        
            const seat =
                actionRequest.seat;
        
            const player =
                state.players.find(
                    (player) =>
                        player.seat ===
                        seat,
                );
        
            if (!player) {
                return null;
            }
        
            const riichiDisabled =
                player.discards.some(
                    (discard) => discard.riichi,
                );
        
            return (
                <DiscardModal
                    title={
                        getModalTitle(
                            "discard",
                            seat,
                        )
                    }
                    anchor={anchor}
                    seat={seat}
                    hand={player.hand}
                    tsumoTile={
                        state.currentTsumo
                    }
                    selectedTile={
                        selectedDiscardTile
                    }
                    riichiDisabled={
                        riichiDisabled
                    }
                    onSelect={
                        setSelectedDiscardTile
                    }
                    onConfirm={(
                        discardType,
                        riichi,
                    ) => {
        
                        if (
                            !selectedDiscardTile
                        ) {
                            return;
                        }

                        const discard:
                            Discard = {
                            tile: selectedDiscardTile,
                            type: discardType,
                            riichi: riichi,
                        };
        
                        callDiscard(
                            seat,
                            discard,
                        );
                    }}
                    onCancel={
                        handleCancel
                    }
                />
            );
        }


        case "pon":
        case "chi":
        case "kan": {
            const seat =
                actionRequest.seat;


            const patterns =
                createMeldPatterns(
                    state,
                    events,
                    seat,
                    actionRequest.action,
                );


            if (
                patterns.length === 0
            ) {
                return null;
            }


            return (
                <MeldModal
                    title={
                        getModalTitle(
                            actionRequest.action,
                            seat,
                        )
                    }
                    caller={seat}
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
                            seat,
                            patterns,
                        )
                    }
                    onCancel={
                        handleCancel
                    }
                />
            );
        }


        case "tsumohora":
        case "ronhora": {
            return null;
        }


        case "dora": {
            const seat =
                state.currentTurn;


            return (
                <DoraModal
                    title={
                        getModalTitle(
                            "dora",
                            seat,
                        )
                    }
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
        }


        default:
            return null;
    }
};