import type { MatchState } from "@/types/match";
import type { MatchEvent } from "@/types/event";
import type { PlayerActionRequest, MeldChoicePattern } from "@/types/analysis";
import { getLatestDiscard } from "@/utils/getLatestDiscard";
import { getPonPatterns, getChiPatterns } from "@/utils/mahjong";


export const createPlayerActionRequest = (
    state: MatchState,
    events: readonly MatchEvent[],
    request: Omit<
        PlayerActionRequest,
        "patterns"
    >,
): PlayerActionRequest | undefined => {

    let patterns:
        MeldChoicePattern[] | undefined;

    if (
        request.action === "pon" ||
        request.action === "chi"
    ) {

        const latestDiscard =
            getLatestDiscard(
                events,
            );

        if (!latestDiscard) {
            return;
        }

        const player =
            state.players.find(
                (player) =>
                    player.seat ===
                    request.seat,
            );

        if (!player) {
            return;
        }

        switch (
            request.action
        ) {

            case "pon":

                patterns =
                    getPonPatterns(
                        player.hand,
                        player.seat,
                        latestDiscard.seat,
                        latestDiscard.tile,
                    );

                break;

            case "chi":

                patterns =
                    getChiPatterns(
                        player.hand,
                        latestDiscard.seat,
                        latestDiscard.tile,
                    );

                break;
        }
    }

    switch (
        request.action
    ) {
    
        case "pon":
    
            return {
                ...request,
    
                action: "pon",
    
                patterns:
                    patterns ?? [],
            };
    
    
        case "chi":
    
            return {
                ...request,
    
                action: "chi",
    
                patterns:
                    patterns ?? [],
            };
    
    
        case "kan":
    
            return {
                ...request,
    
                action: "kan",
    
                patterns:
                    patterns ?? [],
            };
    
    
        case "tsumo":
    
            return {
                ...request,
    
                action: "tsumo",
            };
    
    
        case "discard":
    
            return {
                ...request,
    
                action: "discard",
            };
    
    
        case "ron":
    
            return {
                ...request,
    
                action: "ron",
            };
    }
}