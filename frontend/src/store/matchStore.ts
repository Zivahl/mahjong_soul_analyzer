import { create } from "zustand";
import type { MatchState, Wind } from "../types/match";

interface MatchStore {
    state: MatchState;

    setRoundWind: (wind: Wind) => void;

    setRoundNumber: (round: 1 | 2 | 3 | 4) => void;

    setDealer: (dealer: Wind) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
    state: {
        roundWind: "東",
        roundNumber: 1,
        dealer: "東",

        scores: {
            east: 25000,
            south: 25000,
            west: 25000,
            north: 25000,
        },

        doraIndicators: [],

        riichiSticks: 0,

        honba: 0,

        hand: [],
    },

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
}));
