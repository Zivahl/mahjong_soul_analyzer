import { create } from "zustand";

import type { MatchState, Wind } from "@/types/match";
import type { DiscardType, PlayerActionRequest, PlayerActionState } from "@/types/analysis";
import type { Seat, Meld } from "@/types/player";
import type { TileId } from "@/types/tile";
import type { TsumoEvent, DiscardEvent, MeldEvent, MatchEvent } from "@/types/event";
import { applyEvent } from "@/utils/applyEvent";

const INITIAL_PLAYER_ACTION: PlayerActionState = {
    pon: true,
    chi: true,
    kan: true,
    ron: true,
    tsumo: true,
};

const initialState: MatchState = {
    roundWind: "東",

    roundNumber: 1,

    dealerSeat: "self",

    currentTsumo: undefined,
    
    pendingAction: undefined,

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

interface MatchStore {
    state: MatchState;

    events: MatchEvent[];

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

    openAction: (
        request: PlayerActionRequest,
    ) => void;

    closeAction: () => void;

    tsumoTile: (
        seat: Seat,
        tile: TileId,
    ) => void;

    discardTile: (
        seat: Seat,
        tile: TileId,
        discardType: DiscardType,
    ) => void;

    callMeld: (
        caller: Seat,
        meld: Meld,
    ) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
    state: initialState,

    events:[],

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

    setDoraIndicators: (tiles) =>
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

    openAction: (request) =>
        set((store) => ({
            state: {
                ...store.state,
    
                pendingAction: request,
        },
    })),

    closeAction: () =>
        set((store) => ({
            state: {
                ...store.state,
    
                pendingAction: undefined,
            },
    })),

    tsumoTile: (
        seat,
        tile,
    ) =>
        set((store) => {
    
            const event: TsumoEvent = {
                type: "tsumo",
    
                seat,
    
                tile,
            };
    
            return {

                state:
                    applyEvent(
                        store.state,
                        event,
                    ),
    
                events: [
                    ...store.events,
                    event,
                ],
            };
        }),

    discardTile: (
        seat,
        tile,
        discardType,
    ) =>
        set((store) => {
    
            const event: DiscardEvent = {
                type: "discard",
    
                seat,
    
                tile,
    
                discardType,
            };
    
            return {
    
                state:
                    applyEvent(
                        store.state,
                        event,
                    ),
    
                events: [
                    ...store.events,
                    event,
                ],
            };
        }),

    callMeld: (
        caller,
        meld,
    ) =>
        set((store) => {
    
            const event: MeldEvent = {
                type: "meld",
    
                seat: caller,
    
                meld,
            };

            return {
    
                state:
                    applyEvent(
                        store.state,
                        event,
                    ),
    
                events: [
                    ...store.events,
                    event,
                ],
            };
        }),
}));