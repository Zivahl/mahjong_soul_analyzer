import type { MatchEvent, DiscardEvent } from "@/types/event";

export const getLatestDiscardEvent = (
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