import type { MatchState } from "@/types/match";

import type { MatchEvent } from "@/types/event";

import type { Tile } from "@/types/tile";

import { applyEvent } from "@/utils/event/applyEvent";


export const rebuildState = (
    initialState: MatchState,
    events: readonly MatchEvent[],
    allTiles: readonly Tile[],
): MatchState => {

    let state = initialState;

    const appliedEvents: MatchEvent[] = [];

    for (const event of events) {

        state =
            applyEvent(
                state,
                event,
                appliedEvents,
                allTiles,
            );

        appliedEvents.push(
            event,
        );
    }

    return state;
};