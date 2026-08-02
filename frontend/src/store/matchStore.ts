import { create } from "zustand";

import type { MatchState } from "@/types/match";
import type { DiscardType, ActionRequestBase } from "@/types/analysis";
import type { Seat, Meld } from "@/types/player";
import type { TileId } from "@/types/tile";
import type { TsumoEvent, InitializeRoundEvent, DiscardEvent, MeldEvent, MatchEvent } from "@/types/event";
import { initialMatchState } from "@/store/initialMatchState";
import { applyEvent } from "@/utils/applyEvent";
import { createPlayerActionRequest } from "@/utils/createPlayerActionRequest";
import { rebuildState } from "@/utils/rebuildState";
import { findUndoPoint } from "@/utils/findUndoPoint";

interface MatchStore {
    state: MatchState;

    events: MatchEvent[];

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

    undo: () => void;

    openAction: (
        request: ActionRequestBase,
    ) => void;

    closeAction: () => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
    state: initialMatchState,

    events:[],

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

    undo: () =>
        set((store) => {
    
            const undoPoint =
                findUndoPoint(
                    store.events,
                );
    
            const nextEvents =
                store.events.slice(
                    0,
                    undoPoint,
                );
    
            const nextState =
                rebuildState(
                    initialMatchState,
                    nextEvents,
                );
       
            return {
    
                state:
                    nextState,
    
                events:
                    nextEvents,
    
            };
        }),

    openAction: (request) =>
        set((store) => {
    
            const actionRequest =
                createPlayerActionRequest(
                    store.state,
                    store.events,
                    request,
                );
    
            if (!actionRequest) {
                return store;
            }
    
            return {
    
                state: {
    
                    ...store.state,
    
                    actionRequest,
    
                },
    
            };
        }),

    closeAction: () =>
        set((store) => ({
            state: {
                ...store.state,
    
                actionRequest: undefined,
            },
        })),
}));