import type { MatchState } from "@/types/match";

import type { MatchEvent } from "@/types/event";
import type { Tile } from "@/types/tile";

import { rebuildState } from "@/utils/replay/rebuildState";

import { getReplayState } from "@/utils/replay/getReplayState";


export const verifyReplay = (
    initialState: MatchState,
    currentState: MatchState,
    events: readonly MatchEvent[],
    allTiles: readonly Tile[],
): boolean => {

    const replayState =
        rebuildState(
            initialState,
            events,
            allTiles,
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