import type { MatchState } from "@/types/match";
import type { Seat } from "@/types/seat";
import type { Tile } from "@/types/tile";
import type { MatchEvent } from "@/types/event";
import type {
    PlayerActionState,
} from "@/types/action";

import {
    getNextSeat,
} from "@/utils/mahjong/seat";

import {
    getLatestDiscardEvent,
} from "@/utils/action/getLatestDiscardEvent";

import {
    getPonPatterns,
    getChiPatterns,
    getKanPatterns,
} from "@/utils/mahjong/meld";

import {
    createUnrevealedTiles,
} from "@/utils/mahjong/tile";


const createDefaultActions =
    (): PlayerActionState => {

        return {

            pon: false,

            chi: false,

            kan: false,

            tsumohora: false,

            ronhora: false,

        };
    };


const canPon = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
    unrevealedTiles: readonly Tile[],
): boolean => {

    const latestDiscardEvent =
        getLatestDiscardEvent(
            events,
        );

    if (!latestDiscardEvent) {
        return false;
    }


    /*
     * ポンできるのは、
     * 打牌者以外の席のプレイヤーだけ。
     */
    if (
        latestDiscardEvent.seat ===
        seat
    ) {
        return false;
    }


    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return false;
    }


    const hand =
        seat === "self"
            ? player.hand
            : unrevealedTiles;
    
    const patterns =
        getPonPatterns(
            hand,
            {
                seat:
                    latestDiscardEvent.seat,
                tile:
                    latestDiscardEvent.discard.tile,
            }
        );

    if (
        patterns.length < 1 
    ) {
        return false;
    }


    return seat !== state.currentTurn;
};


const canChi = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
    unrevealedTiles: readonly Tile[],
): boolean => {

    const latestDiscardEvent =
        getLatestDiscardEvent(
            events,
        );

    if (!latestDiscardEvent) {
        return false;
    }


    /*
     * チーできるのは、
     * 打牌者の次の席のプレイヤーだけ。
     */
    const chiSeat =
        getNextSeat(
            latestDiscardEvent.seat,
        );

    if (
        chiSeat !== seat
    ) {
        return false;
    }


    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return false;
    }


    const hand =
        seat === "self"
            ? player.hand
            : unrevealedTiles;
    
    const patterns =
        getChiPatterns(
            hand,
            {
                seat:
                    latestDiscardEvent.seat,
                tile:
                    latestDiscardEvent.discard.tile,
            }
        );

    if (
        patterns.length < 1 
    ) {
        return false;
    }


    return seat !== state.currentTurn;
};


const canDaiminkan = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
    unrevealedTiles: readonly Tile[],
): boolean => {

    const latestDiscard =
        getLatestDiscardEvent(
            events,
        );

    if (!latestDiscard) {
        return false;
    }

    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return false;
    }

    const hand =
        seat === "self"
            ? player.hand
            : unrevealedTiles;
    
    const patterns =
        getKanPatterns(
            hand,
            player.melds,
            seat,
            {
                seat:
                    latestDiscard.seat,

                tile:
                    latestDiscard.discard.tile,
            },
        );

    return patterns.some(
        (pattern) =>
            pattern.meld.kanType ===
            "daiminkan",
    );
};

const canKakan = (
    state: MatchState,
    seat: Seat,
    unrevealedTiles: readonly Tile[],
): boolean => {

    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return false;
    }

    const hand =
        seat === "self"
            ? player.hand
            : unrevealedTiles;
    
    const patterns =
        getKanPatterns(
            hand,
            player.melds,
            seat,
        );

    return patterns.some(
        (pattern) =>
            pattern.meld.kanType ===
            "kakan",
    );
};

const canAnkan = (
    state: MatchState,
    seat: Seat,
    unrevealedTiles: readonly Tile[],
): boolean => {

    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return false;
    }

    const hand =
        seat === "self"
            ? player.hand
            : unrevealedTiles;
    
    const patterns =
        getKanPatterns(
            hand,
            player.melds,
            seat,
        );

    return patterns.some(
        (pattern) =>
            pattern.meld.kanType ===
            "ankan",
    );
};

const canKan = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
    unrevealedTiles: readonly Tile[],
): boolean => {

    const latestEvent =
        events.at(-1);

    if (!latestEvent) {
        return false;
    }


    switch (latestEvent.type) {

        case "discard":

            if (
                latestEvent.seat === seat
            ) {
                return false;
            }

            return canDaiminkan(
                state,
                events,
                seat,
                unrevealedTiles,
            );


        case "tsumo":

            if (
                latestEvent.seat !== seat
            ) {
                return false;
            }

            return (
                canKakan(
                    state,
                    seat,
                    unrevealedTiles,
                ) ||
                canAnkan(
                    state,
                    seat,
                    unrevealedTiles,
                )
            );


        default:
            return false;
    }
};

const canTsumoHora = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
): boolean => {

    const latestEvent =
        events.at(-1);

    if (!latestEvent) {
        return false;
    }


    switch (latestEvent.type) {

        case "tsumo":

            return (
                state.currentTurn ===
                seat
            );

        default:
            return false;
    }
};

const canRonHora = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
): boolean => {

    const latestEvent =
        events.at(-1);

    if (!latestEvent) {
        return false;
    }


    switch (latestEvent.type) {

        case "discard": {

            /*
             * ロン和了できるのは、
             * 打牌者以外の席のプレイヤーだけ。
             */
            if (
                latestEvent.seat ===
                seat
            ) {
                return false;
            }
        
            return true;
        }


        case "meld": {

            const kanType = latestEvent.meld.kanType;

            if (kanType === "kakan") {
                
                if (
                    latestEvent.seat ===
                    seat
                ) {
                    return false;
                }
            
                return true;          
            }
        
            else {
                return false;
            }

        }


        default:
            return false;
    }
};


export const calculatePlayerActions = (
    state: MatchState,
    events: readonly MatchEvent[],
    allTiles: readonly Tile[],
): Record<
    Seat,
    PlayerActionState
> => {

    const unrevealedTiles =
        createUnrevealedTiles(
            allTiles,
            state,
        );

    const actions: Record<
        Seat,
        PlayerActionState
    > = {

        self:
            createDefaultActions(),

        shimocha:
            createDefaultActions(),

        toimen:
            createDefaultActions(),

        kamicha:
            createDefaultActions(),

    };


    state.players.forEach(
        (player) => {

            actions[player.seat] = {

                ...actions[player.seat],

                pon:
                    canPon(
                        state,
                        events,
                        player.seat,
                        unrevealedTiles,
                    ),

                chi:
                    canChi(
                        state,
                        events,
                        player.seat,
                        unrevealedTiles,
                    ),

                kan:
                    canKan(
                        state,
                        events,
                        player.seat,
                        unrevealedTiles,
                    ),

                tsumohora:
                    canTsumoHora(
                        state,
                        events,
                        player.seat,
                    ),

                ronhora:
                    canRonHora(
                        state,
                        events,
                        player.seat,
                    ),

            };

        },
    );

    return actions;
};