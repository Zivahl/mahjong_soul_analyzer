import type { MatchState } from "@/types/match";
import type { Seat } from "@/types/player";
import type { PlayerActionState } from "@/types/analysis";


const DEFAULT_ACTIONS: PlayerActionState = {

    pon: false,

    chi: false,

    kan: false,

    ron: false,

    tsumo: false,

};


export const calculatePlayerActions = (
    state: MatchState,
): Record<Seat, PlayerActionState> => {

    return {

        self: {
            ...DEFAULT_ACTIONS,
        },

        shimocha: {
            ...DEFAULT_ACTIONS,
        },

        toimen: {
            ...DEFAULT_ACTIONS,
        },

        kamicha: {
            ...DEFAULT_ACTIONS,
        },
    };
};