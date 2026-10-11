import { create } from "zustand";


import type { 
    MatchSettings, 
    MatchContext, 
    MatchState 
} from "@/types/match";

import type {
    PlayerActionRequest,
} from "@/types/action";

import type { Discard } from "@/types/discard";

import type { Meld } from "@/types/meld";

import type { Seat } from "@/types/seat"

import type { Tile } from "@/types/tile";

import type {
    InitializeRoundEvent,
    TsumoEvent,
    DiscardEvent,
    MeldEvent,
    DoraEvent,
    MatchEvent,
} from "@/types/event";


import { initialMatchSettings } from "@/store/initialMatchSettings";

import { initialMatchState } from "@/store/initialMatchState";


import { applyEvent } from "@/utils/event/applyEvent";

import { createAllTiles } from "@/utils/mahjong/tile";

import { rebuildState } from "@/utils/replay/rebuildState";

import { findUndoPoint } from "@/utils/replay/findUndoPoint";


interface MatchStore {

    settings: MatchSettings;

    context: MatchContext;

    state: MatchState;

    events: MatchEvent[];

    
    startMatch: (
        settings: MatchSettings,
    ) => void;

    initializeRound: (
        event: InitializeRoundEvent,
    ) => void;

    callTsumo: (
        seat: Seat,
        tile: Tile,
    ) => void;

    callDiscard: (
        seat: Seat,
        discard: Discard,
    ) => void;

    callMeld: (
        caller: Seat,
        meld: Meld,
    ) => void;

    callDora: (
        tile: Tile,
    ) => void;

    requestAction: (
        request: PlayerActionRequest,
    ) => void;

    clearActionRequest: () => void;

    undo: () => void;
}


export const useMatchStore =
    create<MatchStore>(
        (set) => ({

            settings:
                initialMatchSettings,

            context: {
                allTiles:
                    createAllTiles(
                        initialMatchSettings,
                    ),
            },

            state:
                initialMatchState,

            events: [],


            startMatch: (
                settings,
            ) =>
                set(() => ({
                    settings,
            
                    context: {
                        allTiles:
                            createAllTiles(
                                settings,
                            ),
                    },
            
                    state:
                        initialMatchState,
            
                    events: [],
                })),

            initializeRound: (
                event,
            ) =>
                set(
                    (store) => ({

                        state:
                            applyEvent(
                                store.state,
                                event,
                                store.events,
                                store.context.allTiles,
                            ),

                        events: [
                            ...store.events,
                            event,
                        ],

                    }),
                ),

            callTsumo: (
                seat,
                tile,
            ) =>
                set(
                    (store) => {

                        const event:
                            TsumoEvent = {

                            type: "tsumo",

                            seat,

                            tile,
                        };


                        return {

                            state:
                                applyEvent(
                                    store.state,
                                    event,
                                    store.events,
                                    store.context.allTiles,
                                ),

                            events: [
                                ...store.events,
                                event,
                            ],

                        };
                    },
                ),

            callDiscard: (
                seat,
                discard,
            ) =>
                set(
                    (store) => {

                        const event:
                            DiscardEvent = {

                            type: "discard",

                            seat,

                            discard,
                        };


                        return {

                            state:
                                applyEvent(
                                    store.state,
                                    event,
                                    store.events,
                                    store.context.allTiles,
                                ),

                            events: [
                                ...store.events,
                                event,
                            ],

                        };
                    },
                ),

            callMeld: (
                caller,
                meld,
            ) =>
                set(
                    (store) => {

                        const event:
                            MeldEvent = {

                            type: "meld",

                            seat:
                                caller,

                            meld,
                        };


                        return {

                            state:
                                applyEvent(
                                    store.state,
                                    event,
                                    store.events,
                                    store.context.allTiles,
                                ),

                            events: [
                                ...store.events,
                                event,
                            ],

                        };
                    },
                ),

            callDora: (
                tile,
            ) =>
                set(
                    (store) => {

                        const event:
                            DoraEvent = {

                            type: "dora",

                            tile,
                        };


                        return {

                            state:
                                applyEvent(
                                    store.state,
                                    event,
                                    store.events,
                                    store.context.allTiles,
                                ),

                            events: [
                                ...store.events,
                                event,
                            ],

                        };
                    },
                ),

            requestAction: (
                request,
            ) =>
                set(
                    (store) => ({

                        state: {
                            ...store.state,

                            actionRequest:
                                request,
                        },
                        

                    }),
                ),

            clearActionRequest: () =>
                set((store) => ({
                    state: {
                        ...store.state,
                        actionRequest: undefined,
                    },
                })),

            undo: () =>
                set(
                    (store) => {

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
                                store.context.allTiles,
                            );


                        return {

                            state:
                                nextState,

                            events:
                                nextEvents,

                        };
                    },
                ),

        }),
    );