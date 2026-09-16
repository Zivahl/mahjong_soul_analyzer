import type { MatchState } from "@/types/match";

import type { MatchEvent } from "@/types/event";

import { applyEvent } from "@/utils/applyEvent";


export const rebuildState = (
    initialState: MatchState,
    events: readonly MatchEvent[],
): MatchState => {

    let state = initialState;

    const appliedEvents: MatchEvent[] = [];

    for (const event of events) {

        state =
            applyEvent(
                state,
                event,
                appliedEvents,
            );

        appliedEvents.push(
            event,
        );
    }

    return state;
};