import type { MatchState } from "@/types/match";
import type { MatchEvent } from "@/types/event";
import type { ActionRequest } from "@/types/action";
import type { Seat } from "@/types/seat";
import type { KanType } from "@/types/meld";
import { getNextSeat } from "../mahjong/seat";


export const createDefaultNextActionRequest = (
    state: MatchState,
    events: readonly MatchEvent[],
): ActionRequest | undefined => {

    const latestEvent =
        events.at(-1);

    if (!latestEvent) {
        return;
    }


    switch (
        latestEvent.type
    ) {

        case "initializeRound":

            return {
                action: "tsumo",
                seat: latestEvent.currentTurn,
            };


        case "tsumo":

            return {
                action: "discard",
                seat: latestEvent.seat,
            };


        case "discard":

            const eventsBeforeDiscard =
                events.slice(0, -1);

            return createDefaultActionAfterDiscard(
                state,
                eventsBeforeDiscard,
            );


        case "meld":

            const eventsBeforeMeld =
                events.slice(0, -1);

            return createDefaultActionAfterMeld(
                state,
                eventsBeforeMeld,
                latestEvent.seat,
                latestEvent.meld.kanType,
            );


        case "dora":

            const eventsBeforeDora =
                events.slice(0, -1);

            return createDefaultActionAfterDora(
                state,
                eventsBeforeDora,
            );


        default:

            return;
    }
};

const getLatestKanInCurrentTurn = (
    currentTurn: Seat,
    events: readonly MatchEvent[],
): KanType | undefined => {

    for (
        let index = events.length - 1;
        index >= 0;
        index -= 1
    ) {

        const event =
            events[index];

        switch (event.type) {

            case "initializeRound":
            case "dora":
                break;

            case "tsumo":
            case "discard":
            case "meld":

                if (
                    event.seat !== currentTurn
                ) {
                    return;
                }

                if (
                    event.type === "meld" &&
                    event.meld.kanType
                ) {
                    return event.meld.kanType;
                }

                break;
        }
    }

    return;
};

const createDefaultActionAfterDiscard = (
    state: MatchState,
    events: readonly MatchEvent[],
): ActionRequest => {

    const latestKanType = 
        getLatestKanInCurrentTurn(
            state.currentTurn,
            events,
        );

    if (
        latestKanType === "kakan" ||
        latestKanType === "daiminkan"    
    ) {

        return {
            action: "dora",
        };
        
    }

    return {
        action: "tsumo",
        seat: getNextSeat(state.currentTurn),
    };
};

const createDefaultActionAfterMeld = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
    kanType?: KanType,
): ActionRequest => {

    switch (
        kanType
    ) {

        case "daiminkan":

            return {
                action: "tsumo",
                seat,
            };

        case "kakan":

            const latestKanType = 
                getLatestKanInCurrentTurn(
                    state.currentTurn,
                    events,
                );
        
            if (
                latestKanType !== "kakan" &&
                latestKanType !== "daiminkan"    
            ) {
        
                return {
                    action: "tsumo",
                    seat,
                };
                
            }

            return {
                action: "dora",
            };

        case "ankan":

            return {
                action: "dora",
            };

        default:

            break;
    }


    return {
        action: "discard",
        seat,
    };
};

const createDefaultActionAfterDora = (
    state: MatchState,
    events: readonly MatchEvent[],
): ActionRequest => {

    const previousEvent =
        events.at(-1);

    if (
        previousEvent?.type === "meld" &&
        previousEvent.meld.kanType
    ) {
        return {
            action: "tsumo",
            seat: previousEvent.seat,
        };
    }

    return {
        action: "tsumo",
        seat: getNextSeat(state.currentTurn),
    };
};