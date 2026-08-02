import type { InitializeRoundEvent } from "@/types/event";

import type { InitialSettingState } from "@/store/initialSettingStore";

import { getInitialTurnSeat } from "@/utils/getInitialTurnSeat";


export const createInitializeRoundEvent = (
    state: InitialSettingState,
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