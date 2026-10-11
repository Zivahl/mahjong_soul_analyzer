import type { InitializeRoundEvent } from "@/types/event";

import type { MatchState } from "@/types/match";

import { getInitialTurnSeat } from "@/utils/mahjong/seat";


export const createInitializeRoundEvent = (
    state: MatchState,
): InitializeRoundEvent => {

    return {

        type:
            "initializeRound",

        roundWind:
            state.roundWind,

        roundNumber:
            state.roundNumber,

        dealerSeat:
            state.dealerSeat,

        currentTurn:
            getInitialTurnSeat(
                state.dealerSeat,
                state.roundNumber,
            ),

        remainingTiles:
            state.remainingTiles,

        honba:
            state.honba,

        riichiSticks:
            state.riichiSticks,

        doraIndicators:
            [
                ...state.doraIndicators,
            ],

        players:
            state.players.map(
                (player) => ({

                    seat:
                        player.seat,

                    name:
                        player.name,

                    score:
                        player.score,

                    hand:
                        [
                            ...player.hand,
                        ],
                }),
            ),
    };
};