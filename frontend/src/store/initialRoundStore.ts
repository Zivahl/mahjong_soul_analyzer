import { create } from "zustand";

import type { MatchState } from "@/types/match";
import type { Seat, Wind } from "@/types/seat";
import type { Tile } from "@/types/tile";


const createInitialPlayerActions =
(): MatchState["playerActions"] => ({
    self: {
        pon: false,
        chi: false,
        kan: false,
        tsumohora: false,
        ronhora: false,
    },
    shimocha: {
        pon: false,
        chi: false,
        kan: false,
        tsumohora: false,
        ronhora: false,
    },
    toimen: {
        pon: false,
        chi: false,
        kan: false,
        tsumohora: false,
        ronhora: false,
    },
    kamicha: {
        pon: false,
        chi: false,
        kan: false,
        tsumohora: false,
        ronhora: false,
    },
});

const createInitialRoundState =
(): MatchState => ({

    roundWind: "東",

    roundNumber: 1,

    dealerSeat: "self",

    currentTurn: "self",

    remainingTiles: 70,

    honba: 0,

    riichiSticks: 0,

    doraIndicators: [],

    players: [
        {
            id: 0,
            seat: "shimocha",
            name: "",
            score: 25000,
            hand: Array(13).fill("?") as Tile[],
            discards: [],
            melds: [],
        },
        {
            id: 1,
            seat: "toimen",
            name: "",
            score: 25000,
            hand: Array(13).fill("?") as Tile[],
            discards: [],
            melds: [],
        },
        {
            id: 2,
            seat: "kamicha",
            name: "",
            score: 25000,
            hand: Array(13).fill("?") as Tile[],
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

    playerActions: createInitialPlayerActions(),
});

interface InitialRoundStore {

    state: MatchState;

    setRoundWind: (
        wind: Wind,
    ) => void;

    setRoundNumber: (
        round: 1 | 2 | 3 | 4,
    ) => void;

    setDealerSeat: (
        seat: Seat,
    ) => void;

    setRemainingTiles: (
        value: number,
    ) => void;

    setHonba: (
        value: number,
    ) => void;

    setRiichiSticks: (
        value: number,
    ) => void;

    setDoraIndicators: (
        tiles: Tile[],
    ) => void;

    setPlayerName: (
        playerId: number,
        name: string,
    ) => void;

    setPlayerScore: (
        playerId: number,
        score: number,
    ) => void;

    setHand: (
        playerId: number,
        hand: Tile[],
    ) => void;

    reset: () => void;
}

export const useInitialRoundStore =
    create<InitialRoundStore>((set) => ({

        state: createInitialRoundState(),

        setRoundWind: (wind) =>
            set((store) => ({
                state: {
                    ...store.state,
                    roundWind: wind,
                },
            })),

        setRoundNumber: (round) =>
            set((store) => ({
                state: {
                    ...store.state,
                    roundNumber: round,
                },
            })),

        setDealerSeat: (seat) =>
            set((store) => ({
                state: {
                    ...store.state,
                    dealerSeat: seat,
                },
            })),

        setRemainingTiles: (value) =>
            set((store) => ({
                state: {
                    ...store.state,
                    remainingTiles: value,
                },
            })),

        setHonba: (value) =>
            set((store) => ({
                state: {
                    ...store.state,
                    honba: value,
                },
            })),

        setRiichiSticks: (value) =>
            set((store) => ({
                state: {
                    ...store.state,
                    riichiSticks: value,
                },
            })),

        setDoraIndicators: (tiles) =>
            set((store) => ({
                state: {
                    ...store.state,
                    doraIndicators: tiles,
                },
            })),

        setPlayerName: (playerId, name) =>
            set((store) => ({
                state: {
                    ...store.state,
                    players:
                        store.state.players.map((player) =>
                            player.id === playerId
                                ? {
                                      ...player,
                                      name,
                                  }
                                : player,
                        ),
                },
            })),

        setPlayerScore: (playerId, score) =>
            set((store) => ({
                state: {
                    ...store.state,
                    players:
                        store.state.players.map((player) =>
                            player.id === playerId
                                ? {
                                      ...player,
                                      score,
                                  }
                                : player,
                        ),
                },
            })),

        setHand: (playerId, hand) =>
            set((store) => ({
                state: {
                    ...store.state,
                    players:
                        store.state.players.map((player) =>
                            player.id === playerId
                                ? {
                                      ...player,
                                      hand,
                                  }
                                : player,
                        ),
                },
            })),

        reset: () => ({
            state: createInitialRoundState(),
        }),
    }));