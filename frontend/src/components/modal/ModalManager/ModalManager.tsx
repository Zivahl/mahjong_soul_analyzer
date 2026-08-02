import { useEffect, useState } from "react";

import type { TileId } from "@/types/tile";

import { ActionModal } from "@/components/modal/ActionModal/ActionModal";
import { TsumoModal } from "@/components/modal/TsumoModal/TsumoModal";
import { PonModal } from "@/components/modal/PonModal/PonModal";
import { ChiModal } from "@/components/modal/ChiModal/ChiModal";
import { DiscardModal } from "@/components/modal/DiscardModal/DiscardModal";

import { createMeldFromPattern } from "@/utils/createMeldFromPattern";

import { useMatchStore } from "@/store/matchStore";


export const ModalManager = () => {

    const {
        state,
        closeAction,
        tsumoTile,
        discardTile,
        openAction,
        callMeld,
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
    ] = useState<TileId | null>(null);


    const [
        selectedDiscardTile,
        setSelectedDiscardTile,
    ] = useState<TileId | null>(null);


    useEffect(() => {

        if (!actionRequest) {

            setSelectedPatternId(
                "normal",
            );

            setSelectedTsumoTile(
                null,
            );

            setSelectedDiscardTile(
                null,
            );
        }

    }, [actionRequest]);


    if (!actionRequest) {
        return null;
    }


    const player =
        state.players.find(
            (player) =>
                player.seat ===
                actionRequest.seat,
        );


    if (!player) {
        return null;
    }


    switch (
        actionRequest.action
    ) {

        case "pon":

            return (
                <PonModal

                    patterns={
                        actionRequest.patterns
                    }

                    selectedPatternId={
                        selectedPatternId
                    }

                    anchor={
                        actionRequest.anchor
                    }

                    onSelect={
                        setSelectedPatternId
                    }

                    onConfirm={() => {

                        const pattern =
                            actionRequest.patterns.find(
                                (pattern) =>
                                    pattern.id ===
                                    selectedPatternId,
                            );


                        if (!pattern) {
                            return;
                        }


                        const meld =
                            createMeldFromPattern(
                                "pon",
                                pattern,
                            );


                        callMeld(
                            actionRequest.seat,
                            meld,
                        );


                        closeAction();

                    }}

                    onCancel={
                        closeAction
                    }

                />
            );


        case "chi":

            return (
                <ChiModal

                    patterns={
                        actionRequest.patterns
                    }

                    selectedPatternId={
                        selectedPatternId
                    }

                    anchor={
                        actionRequest.anchor
                    }

                    onSelect={
                        setSelectedPatternId
                    }

                    onConfirm={() => {

                        const pattern =
                            actionRequest.patterns.find(
                                (pattern) =>
                                    pattern.id ===
                                    selectedPatternId,
                            );


                        if (!pattern) {
                            return;
                        }


                        const meld =
                            createMeldFromPattern(
                                "chi",
                                pattern,
                            );


                        callMeld(
                            actionRequest.seat,
                            meld,
                        );


                        closeAction();

                    }}

                    onCancel={
                        closeAction
                    }

                />
            );


        case "tsumo":

            return (
                <TsumoModal

                    anchor={
                        actionRequest.anchor
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

                            tsumoTile(
                                actionRequest.seat,
                                selectedTsumoTile,
                            );
                        }


                        openAction({

                            seat:
                                actionRequest.seat,

                            action:
                                "discard",

                            anchor:
                                actionRequest.anchor,

                        });

                    }}

                    onCancel={
                        closeAction
                    }

                />
            );


        case "discard":

            return (
                <DiscardModal

                    title="打牌設定"


                    anchor={
                        actionRequest.anchor
                    }


                    seat={
                        actionRequest.seat
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
                            actionRequest.seat,
                            selectedDiscardTile,
                            discardType,
                        );


                        closeAction();

                    }}


                    onCancel={
                        closeAction
                    }

                />
            );


        case "kan":
        case "ron":

            return (
                <ActionModal

                    action={
                        actionRequest.action
                    }

                    onClose={
                        closeAction
                    }

                />
            );


        default:

            return null;
    }
};