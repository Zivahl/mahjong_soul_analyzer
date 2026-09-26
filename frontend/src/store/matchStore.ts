import { create } from "zustand";


import type { MatchState } from "@/types/match";

import type {
    DiscardType,
    PlayerActionRequest,
} from "@/types/analysis";

import type {
    Seat,
    Meld,
} from "@/types/player";

import type { TileId } from "@/types/tile";

import type {
    TsumoEvent,
    InitializeRoundEvent,
    DiscardEvent,
    MeldEvent,
    DoraEvent,
    MatchEvent,
} from "@/types/event";


import { initialMatchState } from "@/store/initialMatchState";

import { applyEvent } from "@/utils/applyEvent";

import { rebuildState } from "@/utils/rebuildState";

import { findUndoPoint } from "@/utils/findUndoPoint";


interface MatchStore {

    state: MatchState;

    events: MatchEvent[];


    initializeRound: (
        event: InitializeRoundEvent,
    ) => void;


    callTsumo: (
        seat: Seat,
        tile: TileId,
    ) => void;


    callDiscard: (
        seat: Seat,
        tile: TileId,
        discardType: DiscardType,
    ) => void;


    callMeld: (
        caller: Seat,
        meld: Meld,
    ) => void;


    callDora: (
        tile: TileId,
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

            state:
                initialMatchState,


            events: [],


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
                tile,
                discardType,
            ) =>
                set(
                    (store) => {

                        const event:
                            DiscardEvent = {

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
                                    store.events,
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