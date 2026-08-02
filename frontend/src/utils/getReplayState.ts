import type {
    MatchState,
} from "@/types/match";

import type {
    PlayerState,
} from "@/types/player";


type ReplayPlayerState = Pick<
    PlayerState,
    | "id"
    | "seat"
    | "score"
    | "hand"
    | "discards"
    | "melds"
>;


type ReplayState = Pick<
    MatchState,
    | "roundWind"
    | "roundNumber"
    | "dealerSeat"
    | "remainingTiles"
    | "riichiSticks"
    | "honba"
    | "doraIndicators"
> & {
    players: ReplayPlayerState[];
};


export const getReplayState = (
    state: MatchState,
): ReplayState => {

    return {
        roundWind:
            state.roundWind,

        roundNumber:
            state.roundNumber,

        dealerSeat:
            state.dealerSeat,

        remainingTiles:
            state.remainingTiles,

        riichiSticks:
            state.riichiSticks,

        honba:
            state.honba,

        doraIndicators:
            state.doraIndicators,

        players:
            state.players.map(
                (player) => ({
                    id:
                        player.id,

                    seat:
                        player.seat,

                    score:
                        player.score,

                    hand:
                        player.hand,

                    discards:
                        player.discards,

                    melds:
                        player.melds,
                }),
            ),
    };
};