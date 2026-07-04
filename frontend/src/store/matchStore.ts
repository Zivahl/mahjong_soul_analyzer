import { create } from "zustand";

import type { MatchState, Wind } from "@/types/match";

const initialState: MatchState = {
    roundWind: "東",

    roundNumber: 1,

    riichiSticks: 0,

    honba: 0,

    doraIndicators: [],

    players: [
        {
            id: 0,
            name: "Player 1",
            wind: "東",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
            isDealer: true,
        },
        {
            id: 1,
            name: "Player 2",
            wind: "南",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
            isDealer: false,
        },
        {
            id: 2,
            name: "Player 3",
            wind: "西",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
            isDealer: false,
        },
        {
            id: 3,
            name: "Player 4",
            wind: "北",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
            isDealer: false,
        },
    ],
};

interface MatchStore {
    state: MatchState;

    setRoundWind: (wind: Wind) => void;

    setRoundNumber: (round: 1 | 2 | 3 | 4) => void;

    setDealer: (dealer: Wind) => void;
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

                players: store.state.players.map((player) => ({
                    ...player,

                    isDealer: player.wind === dealer,
                })),
            },
        })),
}));
