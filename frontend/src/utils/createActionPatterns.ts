import type {
    MatchState,
} from "@/types/match";

import type {
    MatchEvent,
} from "@/types/event";

import type {
    MeldChoicePattern,
} from "@/types/analysis";

import type {
    Seat,
    MeldType
} from "@/types/player";

import {
    getLatestDiscardEvent,
} from "@/utils/getLatestDiscardEvent";

import {
    getPonPatterns,
    getChiPatterns,
    getKanPatterns,
} from "@/utils/mahjong";


export const createMeldPatterns = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
    action: MeldType,
): MeldChoicePattern[] => {

    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );


    if (!player) {
        return [];
    }


    switch (action) {

        case "pon": {

            const latestDiscardEvent =
                getLatestDiscardEvent(
                    events,
                );

            if (
                !latestDiscardEvent
            ) {
                return [];
            }


            return getPonPatterns(
                player.hand,
                {
                    seat:
                        latestDiscardEvent.seat,

                    tile:
                        latestDiscardEvent.tile,
                },
            );
        }


        case "chi": {

            const latestDiscardEvent =
                getLatestDiscardEvent(
                    events,
                );

            if (
                !latestDiscardEvent
            ) {
                return [];
            }


            return getChiPatterns(
                player.hand,
                {
                    seat:
                        latestDiscardEvent.seat,

                    tile:
                        latestDiscardEvent.tile,
                },
            );
        }


        case "kan": {

            const latestEvent =
                events.at(-1);

            if (!latestEvent) {
                return [];
            }


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
                        seat
                    ) {
                        return [];
                    }


                    return getKanPatterns(
                        player.hand,
                        player.melds,
                        player.seat,
                        latestEvent,
                    );
                }


                /*
                 * 加槓 / 暗槓
                 *
                 * 自家のツモ直後。
                 */
                case "tsumo": {

                    if (
                        latestEvent.seat !==
                        seat
                    ) {
                        return [];
                    }


                    return getKanPatterns(
                        player.hand,
                        player.melds,
                        player.seat,
                    );
                }


                /*
                 * 鳴き直後・局初期・ドラ表示牌など。
                 */
                case "meld":
                case "initializeRound":
                case "dora":

                    return [];
            }
        }
    }
};