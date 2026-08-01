import type { MatchState } from "@/types/match";

import type { MatchEvent, TsumoEvent, DiscardEvent, MeldEvent } from "@/types/event";

export const applyEvent = (
    state: MatchState,
    event: MatchEvent,
): MatchState => {

    switch (event.type) {

        case "tsumo":
            return applyTsumo(
                state,
                event,
            );

        case "discard":
            return applyDiscard(
                state,
                event,
            );

        case "meld":
            return applyMeld(
                state,
                event,
            );

        default:
            return state;
    }
};

const applyTsumo = (
    state: MatchState,
    event: TsumoEvent,
): MatchState => {

    return {
        ...state,

        currentTsumo:
            event.tile,

        players:
            state.players.map(
                (player) => {

                    if (
                        player.seat !==
                        event.seat
                    ) {
                        return player;
                    }

                    return {
                        ...player,

                        hand: [
                            ...player.hand,
                            event.seat === "self"
                                ? event.tile
                                : "?",
                        ],
                    };
                },
            ),
    };
};

const applyDiscard = (
    state: MatchState,
    event: DiscardEvent,
): MatchState => {

    const player =
        state.players.find(
            (player) =>
                player.seat ===
                event.seat,
        );

    if (!player) {
        return state;
    }

    let hand = [...player.hand];

    if (event.seat === "self") {

        switch (
            event.discardType
        ) {

            case "tedashi": {

                const removeIndex =
                    hand.findIndex(
                        (candidate) =>
                            candidate ===
                            event.tile,
                    );

                if (
                    removeIndex >= 0
                ) {
                    hand.splice(
                        removeIndex,
                        1,
                    );
                }

                break;
            }

            case "tsumogiri":

                hand.pop();

                break;
        }

    } else {

        switch (
            event.discardType
        ) {

            case "tedashi": {

                const unknownIndex =
                    hand.findIndex(
                        (candidate) =>
                            candidate ===
                            "?",
                    );

                if (
                    unknownIndex >= 0
                ) {
                    hand.splice(
                        unknownIndex,
                        1,
                    );
                }

                break;
            }

            case "tsumogiri":

                hand.pop();

                break;
        }
    }

    return {
        ...state,

        currentTsumo:
            undefined,

        players:
            state.players.map(
                (candidate) =>
                    candidate.seat ===
                    event.seat
                        ? {
                              ...candidate,

                              hand,

                              discards: [
                                  ...candidate.discards,
                                  {
                                      tile:
                                          event.tile,

                                      type:
                                          event.discardType,
                                  },
                              ],
                          }
                        : candidate,
            ),
    };
};

const applyMeld = (
    state: MatchState,
    event: MeldEvent,
): MatchState => {

    const caller =
        event.seat;

    const meld =
        event.meld;

    const fromPlayer =
        state.players.find(
            (player) =>
                player.seat ===
                meld.from,
        );

    const callerPlayer =
        state.players.find(
            (player) =>
                player.seat ===
                caller,
        );

    if (
        !fromPlayer ||
        !callerPlayer
    ) {
        return state;
    }

    const calledTile =
        fromPlayer.discards.at(-1)?.tile;

    if (!calledTile) {
        return state;
    }

    const newHand = [
        ...callerPlayer.hand,
    ];

    meld.tiles
        .filter(
            (tile) =>
                tile !==
                calledTile,
        )
        .forEach(
            (tile) => {

                const index =
                    newHand.findIndex(
                        (candidate) =>
                            candidate ===
                            tile,
                    );

                if (
                    index >= 0
                ) {
                    newHand.splice(
                        index,
                        1,
                    );
                }
            },
        );

    return {
        ...state,

        players:
            state.players.map(
                (player) => {

                    if (
                        player.seat ===
                        meld.from
                    ) {
                        return {
                            ...player,

                            discards:
                                player.discards.slice(
                                    0,
                                    -1,
                                ),
                        };
                    }

                    if (
                        player.seat ===
                        caller
                    ) {
                        return {
                            ...player,

                            hand:
                                newHand,

                            melds: [
                                ...player.melds,
                                meld,
                            ],
                        };
                    }

                    return player;
                },
            ),
    };
};