import type { MatchState } from "@/types/match";
import type { MatchEvent } from "@/types/event";

import type {
    PlayerActionRequest,
    MeldChoicePattern,
} from "@/types/analysis";

import {
    getLatestDiscardEvent,
} from "@/utils/getLatestDiscardEvent";

import {
    getPonPatterns,
    getChiPatterns,
    getKanPatterns,
} from "@/utils/mahjong";


export const createPlayerActionRequest = (
    state: MatchState,
    events: readonly MatchEvent[],
    request: Omit<
        PlayerActionRequest,
        "patterns"
    >,
): PlayerActionRequest | undefined => {

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

        case "pon": {

            const latestDiscardEvent =
                getLatestDiscardEvent(
                    events,
                );

            if (
                !latestDiscardEvent
            ) {
                return;
            }


            const patterns:
                MeldChoicePattern[] =
                    getPonPatterns(
                        player.hand,
                        {
                            seat:
                                latestDiscardEvent.seat,
    
                            tile:
                                latestDiscardEvent.tile,
                        },
                    );


            return {
                ...request,

                action: "pon",

                patterns,
            };
        }


        case "chi": {

            const latestDiscardEvent =
                getLatestDiscardEvent(
                    events,
                );

            if (
                !latestDiscardEvent
            ) {
                return;
            }


            const patterns:
                MeldChoicePattern[] =
                    getChiPatterns(
                        player.hand,
                        {
                            seat:
                                latestDiscardEvent.seat,
    
                            tile:
                                latestDiscardEvent.tile,
                        },
                    );


            return {
                ...request,

                action: "chi",

                patterns,
            };
        }


        case "kan": {

            const latestEvent =
                events.at(-1);

            if (!latestEvent) {
                return;
            }


            let patterns:
                MeldChoicePattern[];


            switch (
                latestEvent.type
            ) {

                /*
                 * 大明槓
                 *
                 * 他家の打牌直後。
                 */
                case "discard": {

                    if (
                        latestEvent.seat ===
                        request.seat
                    ) {
                        return;
                    }


                    patterns =
                        getKanPatterns(
                            player.hand,
                            player.melds,
                            player.seat,
                            latestEvent,
                        );

                    break;
                }


                /*
                 * 加槓 / 暗槓
                 *
                 * 自家のツモ直後。
                 */
                case "tsumo": {

                    if (
                        latestEvent.seat !==
                        request.seat
                    ) {
                        return;
                    }


                    patterns =
                        getKanPatterns(
                            player.hand,
                            player.melds,
                            player.seat,
                        );

                    break;
                }


                /*
                 * 鳴き直後・局初期など。
                 */
                case "meld":
                case "initializeRound":

                    return;
            }


            if (
                patterns.length === 0
            ) {
                return;
            }


            return {
                ...request,

                action: "kan",

                patterns,
            };
        }


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


        default:

            return;
    }
};