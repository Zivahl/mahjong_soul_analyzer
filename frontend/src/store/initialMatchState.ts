import type { MatchState } from "@/types/match";
import type { PlayerActionState } from "@/types/analysis";

const INITIAL_PLAYER_ACTION: PlayerActionState = {
    pon: true,
    chi: true,
    kan: true,
    ron: true,
    tsumo: true,
};

export const initialMatchState: MatchState = {
    roundWind: "東",

    roundNumber: 1,

    dealerSeat: "self",

    currentTurn: "self",

    currentTsumo: undefined,
    
    actionRequest: undefined,

    remainingTiles: 70,

    riichiSticks: 0,

    honba: 0,

    doraIndicators: [],

    players: [
        {
            id: 0,
            seat: "shimocha",
            name: "",
            score: 25000,
            hand: Array(13).fill("?"),
            discards: [],
            melds: [],
        },
        {
            id: 1,
            seat: "toimen",
            name: "",
            score: 25000,
            hand: Array(13).fill("?"),
            discards: [],
            melds: [],
        },
        {
            id: 2,
            seat: "kamicha",
            name: "",
            score: 25000,
            hand: Array(13).fill("?"),
            discards: [],
            melds: [],
        },
        {
            id: 3,
            seat: "self",
            name: "",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
        },
    ],

    playerActions: {
        self: {
            ...INITIAL_PLAYER_ACTION,
        },

        shimocha: {
            ...INITIAL_PLAYER_ACTION,
        },

        toimen: {
            ...INITIAL_PLAYER_ACTION,
        },

        kamicha: {
            ...INITIAL_PLAYER_ACTION,
        },
    },
};