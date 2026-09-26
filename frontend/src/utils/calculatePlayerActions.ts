import type { MatchState } from "@/types/match";
import type { Seat } from "@/types/player";
import type { MatchEvent } from "@/types/event";
import type {
    PlayerActionState,
} from "@/types/analysis";

import {
    getNextSeat,
} from "@/utils/getNextSeat";

import {
    getLatestDiscardEvent,
} from "@/utils/getLatestDiscardEvent";

import {
    getPonPatterns,
    getChiPatterns,
    getKanPatterns,
} from "@/utils/mahjong";


const createDefaultActions =
    (): PlayerActionState => {

        return {

            pon: false,

            chi: false,

            kan: false,

            ron: false,

            tsumo: false,

        };
    };


const canPon = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
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


    const patterns =
        getPonPatterns(
            player.hand,
            {
                seat:
                    latestDiscardEvent.seat,
                tile:
                    latestDiscardEvent.tile,
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


    const patterns =
        getChiPatterns(
            player.hand,
            {
                seat:
                    latestDiscardEvent.seat,
                tile:
                    latestDiscardEvent.tile,
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

    const patterns =
        getKanPatterns(
            player.hand,
            player.melds,
            seat,
            {
                seat:
                    latestDiscard.seat,

                tile:
                    latestDiscard.tile,
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
): boolean => {

    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return false;
    }

    const patterns =
        getKanPatterns(
            player.hand,
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
): boolean => {

    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return false;
    }

    const patterns =
        getKanPatterns(
            player.hand,
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
                ) ||
                canAnkan(
                    state,
                    seat,
                )
            );


        default:
            return false;
    }
};

const canRon = (
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
             * ロンできるのは、
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


const canTsumo = (
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

        case "initializeRound":

            return (
                state.currentTurn ===
                seat
            );

        case "discard": {

            /*
             * ツモできるのは、
             * 打牌者の次の席のプレイヤーだけ。
             */
            const tsumoSeat =
                getNextSeat(
                    latestEvent.seat,
            );
        
            if (
                tsumoSeat !== seat
            ) {
                return false;
            }
        
        
            return tsumoSeat !== state.currentTurn;
        }


        case "meld": {

            const kanType = latestEvent.meld.kanType;

            if (kanType === "daiminkan") {
                return seat === state.currentTurn;           
            }
        
            else if (kanType === "kakan") {
                return seat === state.currentTurn;           
            }

            else {
                return false;
            }

        }


        case "dora": {

            const previousEvent = events.at(-2);
     
            if (
                previousEvent?.type === "meld" &&
                previousEvent.meld.kanType
            ) {
                return seat === state.currentTurn;       
            }


            /*
             * ツモできるのは、
             * 打牌者の次の席のプレイヤーだけ。
             */
            const tsumoSeat =
                getNextSeat(
                    state.currentTurn,
            );
        
            if (
                tsumoSeat !== seat
            ) {
                return false;
            }
        
        
            return true;

        }


        default:
            return false;
    }
};


export const calculatePlayerActions = (
    state: MatchState,
    events: readonly MatchEvent[],
): Record<
    Seat,
    PlayerActionState
> => {

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
                    ),

                chi:
                    canChi(
                        state,
                        events,
                        player.seat,
                    ),

                kan:
                    canKan(
                        state,
                        events,
                        player.seat,
                    ),

                ron:
                    canRon(
                        state,
                        events,
                        player.seat,
                    ),

                tsumo:
                    canTsumo(
                        state,
                        events,
                        player.seat,
                    ),

            };

        },
    );

    return actions;
};