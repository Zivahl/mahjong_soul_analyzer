import { create } from "zustand";

import type { Wind } from "@/types/match";
import type { Seat } from "@/types/player";
import type { TileId } from "@/types/tile";

interface InitialSettingPlayerState {
    id: number;

    seat: Seat;

    name: string;

    score: number;

    hand: TileId[];
}

export interface InitialSettingState {
    roundWind: Wind;

    roundNumber: 1 | 2 | 3 | 4;

    dealerSeat: Seat;

    remainingTiles: number;

    honba: number;

    riichiSticks: number;

    doraIndicators: TileId[];

    players: InitialSettingPlayerState[];
}

const createInitialSettingState =
(): InitialSettingState => ({

    roundWind: "東",

    roundNumber: 1,

    dealerSeat: "self",

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
            hand: Array(13).fill("?") as TileId[],
        },
        {
            id: 1,
            seat: "toimen",
            name: "",
            score: 25000,
            hand: Array(13).fill("?") as TileId[],
        },
        {
            id: 2,
            seat: "kamicha",
            name: "",
            score: 25000,
            hand: Array(13).fill("?") as TileId[],
        },
        {
            id: 3,
            seat: "self",
            name: "",
            score: 25000,
            hand: [],
        },
    ],
});

interface InitialSettingStore {

    state: InitialSettingState;

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
        tiles: TileId[],
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
        hand: TileId[],
    ) => void;

    reset: () => void;
}

export const useInitialSettingStore =
    create<InitialSettingStore>((set) => ({

        state: createInitialSettingState(),

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
            state: createInitialSettingState(),
        }),
    }));