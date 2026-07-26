import { useEffect, useState } from "react";

import type { TileId } from "@/types/tile";
import type { Meld } from "@/types/player";

import { ActionModal } from "@/components/modal/ActionModal/ActionModal";
import { TsumoModal } from "@/components/modal/TsumoModal/TsumoModal";
import { PonModal } from "@/components/modal/PonModal/PonModal";
import { ChiModal } from "@/components/modal/ChiModal/ChiModal";
import { DiscardModal } from "@/components/modal/DiscardModal/DiscardModal";

import { useMatchStore } from "@/store/matchStore";

import { getPonPatterns, getChiPatterns } from "@/utils/mahjong";


export const ModalManager = () => {

    const {
        state,
        closeAction,
        tsumoTile,
        discardTile,
        openAction,
        callMeld,
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

    const meldPatterns =
        request.action === "pon"
            ? getPonPatterns(
                  player.hand,
                  player.seat,
                  request.from!,
                  request.tile!,
              )
            : request.action === "chi"
            ? getChiPatterns(
                  player.hand,
                  request.from!,
                  request.tile!,
              )
            : [];

    switch (request.action) {

        case "pon":
            return (
                <PonModal
                    patterns={
                        meldPatterns
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
                        const pattern =
                            meldPatterns.find(
                                (pattern) =>
                                    pattern.id ===
                                    selectedPatternId,
                            );
                    
                        if (!pattern) {
                            return;
                        }
                    
                        const meld: Meld = {
                            type: "pon",
                    
                            tiles:
                                pattern.tiles.map(
                                    (tile) =>
                                        tile.tile,
                                ),
                    
                            from:
                                pattern.from,
                        };
                                  
                        callMeld(
                            request.seat,
                            meld,
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
                        meldPatterns
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
                        const pattern =
                            meldPatterns.find(
                                (pattern) =>
                                    pattern.id ===
                                    selectedPatternId,
                            );
                    
                        if (!pattern) {
                            return;
                        }
                    
                        const meld: Meld = {
                            type: "chi",
                    
                            tiles:
                                pattern.tiles.map(
                                    (tile) =>
                                        tile.tile,
                                ),
                    
                            from:
                                pattern.from,
                        };
                                  
                        callMeld(
                            request.seat,
                            meld,
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
                            tsumoTile(
                                request.seat,
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

                    seat={
                        request.seat
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