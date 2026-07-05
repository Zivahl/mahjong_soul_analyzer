import { create } from "zustand";

import type { MatchState, Wind } from "@/types/match";
import type { TileId } from "@/types/tile";

const initialState: MatchState = {
    roundWind: "東",

    roundNumber: 1,

    dealer: "東",

    riichiSticks: 0,

    honba: 0,

    doraIndicators: [],

    players: [
        {
            id: 0,
            seat: "self",
            name: "",
            wind: "東",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
        },
        {
            id: 1,
            seat: "shimocha",
            name: "",
            wind: "南",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
        },
        {
            id: 2,
            seat: "toimen",
            name: "",
            wind: "西",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
        },
        {
            id: 3,
            seat: "kamicha",
            name: "",
            wind: "北",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
        },
    ],
};

interface MatchStore {
    state: MatchState;

    setRoundWind: (wind: Wind) => void;

    setRoundNumber: (round: 1 | 2 | 3 | 4) => void;

    setDealer: (dealer: Wind) => void;

    setPlayerName: (
        playerId: number, 
        name: string,
    ) => void;

    setPlayerScore: (
        playerId: number,
        score: number,
    ) => void;

    setDoraIndicators: (
        tiles: TileId[],
    ) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
    state: initialState,

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

    setDealer: (dealer) =>
        set((store) => ({
            state: {
                ...store.state,
                dealer,
            },
        })),

    setPlayerName: (playerId, name) =>
        set((store) => ({
            state: {
                ...store.state,
                players: store.state.players.map((player) =>
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
                players: store.state.players.map((player) =>
                    player.id === playerId
                        ? {
                              ...player,
                              score,
                          }
                        : player,
                ),
            },
        })),

    setDoraIndicators: (tiles: TileId[]) =>
        set((store) => ({
            state: {
                ...store.state,
                doraIndicators: tiles,
            },
    })),
}));
