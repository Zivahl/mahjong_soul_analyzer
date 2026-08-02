import type { MatchEvent, DiscardEvent } from "@/types/event";

import type { Seat } from "@/types/player";


export interface LatestDiscard {

    from: Seat;

    tile: string;
}

export const getLatestDiscard = (
    events: readonly MatchEvent[],
): DiscardEvent | undefined => {

    for (
        let i = events.length - 1;
        i >= 0;
        i--
    ) {

        const event =
            events[i];

        if (
            event.type ===
            "discard"
        ) {
            return event;
        }
    }

    return;
};