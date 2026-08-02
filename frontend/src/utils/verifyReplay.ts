import type { MatchState } from "@/types/match";

import type { MatchEvent } from "@/types/event";

import { rebuildState } from "@/utils/rebuildState";

import { getReplayState } from "@/utils/getReplayState";


export const verifyReplay = (
    initialState: MatchState,
    currentState: MatchState,
    events: readonly MatchEvent[],
): boolean => {

    const replayState =
        rebuildState(
            initialState,
            events,
        );

    return (
        JSON.stringify(
            getReplayState(
                replayState,
            ),
        )
        ===
        JSON.stringify(
            getReplayState(
                currentState,
            ),
        )
    );
};