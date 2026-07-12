import { create } from "zustand";

import type { MatchState, Wind } from "@/types/match";
import type { PlayerActionState } from "@/types/analysis";
import type { Seat } from "@/types/player";
import type { TileId } from "@/types/tile";

const INITIAL_PLAYER_ACTION: PlayerActionState = {
    pon: false,
    chi: false,
    kan: false,
    ron: false,
    tsumo: false,
};

const initialState: MatchState = {
    roundWind: "東",

    roundNumber: 1,

    dealerSeat: "self",

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
            hand: [],
            discards: [],
            melds: [],
        },
        {
            id: 1,
            seat: "toimen",
            name: "",
            score: 25000,
            hand: [],
            discards: [],
            melds: [],
        },
        {
            id: 2,
            seat: "kamicha",
            name: "",
            score: 25000,
            hand: [],
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

interface MatchStore {
    state: MatchState;

    setRoundWind: (wind: Wind) => void;

    setRoundNumber: (round: 1 | 2 | 3 | 4) => void;

    setDealerSeat: (seat: Seat) => void;

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

    setRiichiSticks: (
        value: number,
    ) => void;

    setHonba: (
        value: number,
    ) => void;

    setHand: (
        playerId: number,
        hand: TileId[],
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

    setDealerSeat: (seat) =>
        set((state) => ({
            state: {
                ...state.state,
                dealerSeat: seat,
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

    setRiichiSticks: (value) =>
        set((store) => ({
            state: {
                ...store.state,
                riichiSticks: value,
            },
        })),

    setHonba: (value) =>
        set((store) => ({
            state: {
                ...store.state,
                honba: value,
            },
        })),

    setHand: (playerId, hand) =>
        set((store) => ({
            state: {
                ...store.state,
                players: store.state.players.map((player) =>
                    player.id === playerId
                        ? {
                              ...player,
                              hand,
                          }
                        : player,
                ),
            },
        })),
}));
