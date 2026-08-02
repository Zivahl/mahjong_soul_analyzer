import type { MatchState } from "@/types/match";

import type { MatchEvent } from "@/types/event";

import { applyEvent } from "@/utils/applyEvent";


export const rebuildState = (
    initialState: MatchState,
    events: readonly MatchEvent[],
): MatchState => {

    return events.reduce(
        (
            state,
            event,
        ) =>
            applyEvent(
                state,
                event,
            ),
        initialState,
    );
};