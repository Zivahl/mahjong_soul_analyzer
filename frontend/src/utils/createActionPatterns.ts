import type { MatchState } from "@/types/match";
import type { MatchEvent } from "@/types/event";
import type { Seat } from "@/types/player";
import type { MeldChoicePattern } from "@/types/analysis";

import {
    getLatestDiscardEvent,
} from "@/utils/getLatestDiscardEvent";

import {
    getPonPatterns,
    getChiPatterns,
    getKanPatterns,
} from "@/utils/mahjong";


export const createPonPatterns = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
): MeldChoicePattern[] => {
    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return [];
    }

    const latestDiscardEvent =
        getLatestDiscardEvent(events);

    if (!latestDiscardEvent) {
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
};


export const createChiPatterns = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
): MeldChoicePattern[] => {
    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return [];
    }

    const latestDiscardEvent =
        getLatestDiscardEvent(events);

    if (!latestDiscardEvent) {
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
};


export const createKanPatterns = (
    state: MatchState,
    events: readonly MatchEvent[],
    seat: Seat,
): MeldChoicePattern[] => {
    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return [];
    }

    const latestEvent =
        events.at(-1);

    if (!latestEvent) {
        return [];
    }

    switch (latestEvent.type) {

        case "discard":

            if (
                latestEvent.seat === seat
            ) {
                return [];
            }

            return getKanPatterns(
                player.hand,
                player.melds,
                player.seat,
                latestEvent,
            );


        case "tsumo":

            if (
                latestEvent.seat !== seat
            ) {
                return [];
            }

            return getKanPatterns(
                player.hand,
                player.melds,
                player.seat,
            );


        case "meld":
        case "initializeRound":
        case "dora":

            return [];
    }
};