import { create } from "zustand";

import { initialMatchState } from "@/store/initialMatchState";
import type { MatchState, Wind } from "@/types/match";
import type { DiscardType, PlayerActionRequest } from "@/types/analysis";
import type { Seat, Meld } from "@/types/player";
import type { TileId } from "@/types/tile";
import type { TsumoEvent, InitializeRoundEvent, DiscardEvent, MeldEvent, MatchEvent } from "@/types/event";
import { applyEvent } from "@/utils/applyEvent";

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

    initializeRound: (
        event: InitializeRoundEvent,
    ) => void;

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
    state: initialMatchState,

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

    initializeRound: (
        event,
    ) =>
        set((store) => ({
  
            state:
                applyEvent(
                    store.state,
                    event,
                ),
    
            events: [
                ...store.events,
                event,
            ],
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