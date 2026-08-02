import type { InitializeRoundEvent } from "@/types/event";

import type { InitialSettingState } from "@/store/initialSettingStore";


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