import type { MatchState } from "@/types/match";

import type { MatchEvent, InitializeRoundEvent, TsumoEvent, DiscardEvent, MeldEvent } from "@/types/event";

import { calculatePlayerActions } from "@/utils/calculatePlayerActions";

import { getNormalizeTile } from "@/utils/mahjong"

export const applyEvent = (
    state: MatchState,
    event: MatchEvent,
    events: readonly MatchEvent[],
): MatchState => {

    let nextState: MatchState;

    switch (event.type) {

        case "initializeRound":

            nextState =
                applyInitializeRound(
                    state,
                    event,
                );

            break;


        case "tsumo":

            nextState =
                applyTsumo(
                    state,
                    event,
                );

            break;


        case "discard":

            nextState =
                applyDiscard(
                    state,
                    event,
                );

            break;


        case "meld":

            nextState =
                applyMeld(
                    state,
                    event,
                );

            break;


        default:

            return state;
    }


    const nextEvents = [
        ...events,
        event,
    ];

    return {

        ...nextState,

        playerActions:
            calculatePlayerActions(
                nextState,
                nextEvents,
            ),

    };
};

const applyInitializeRound = (
    state: MatchState,
    event: InitializeRoundEvent,
): MatchState => {

    return {

        ...state,

        roundWind:
            event.roundWind,

        roundNumber:
            event.roundNumber,

        dealerSeat:
            event.dealerSeat,

        currentTurn:
            event.currentTurn,

        remainingTiles:
            event.remainingTiles,

        honba:
            event.honba,

        riichiSticks:
            event.riichiSticks,

        doraIndicators:
            [...event.doraIndicators],

        players:
            state.players.map(
                (player) => {

                    const initialized =
                        event.players.find(
                            (candidate) =>
                                candidate.seat === player.seat,
                        );

                    if (!initialized) {
                        return player;
                    }

                    return {

                        ...player,

                        name:
                            initialized.name,

                        score:
                            initialized.score,

                        hand:
                            [...initialized.hand],

                        discards: [],

                        melds: [],
                    };
                },
            ),
    };
};

const applyTsumo = (
    state: MatchState,
    event: TsumoEvent,
): MatchState => {

    return {
        ...state,

        currentTurn:
            event.seat,

        currentTsumo:
            event.tile,
        
        remainingTiles:
            state.remainingTiles - 1,

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

    const fromSeat =
        meld.calledDiscard?.seat;

    const fromPlayer =
        state.players.find(
            (player) =>
                player.seat ===
                fromSeat,
        );

    const callerPlayer =
        state.players.find(
            (player) =>
                player.seat ===
                caller,
        );

    if (
        !callerPlayer
    ) {
        return state;
    }

    if (
        meld.kanType !== "ankan" &&
        !fromPlayer
    ) {
        return state;
    }

    const newHand = [
        ...callerPlayer.hand,
    ];

    meld.tiles
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

        currentTurn:
            event.seat,

        players:
            state.players.map(
                (player) => {

                    if (
                        fromPlayer &&
                        player.seat ===
                        fromPlayer.seat &&
                        meld.calledDiscard
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

                        if (
                            meld.kanType ===
                            "kakan"
                        ) {
                            const meldIndex =
                                player.melds.findIndex(
                                    (existingMeld) =>
                                        existingMeld.type ===
                                            "pon" &&
                                        existingMeld.tiles.length ===
                                            2 &&
                                        existingMeld.calledDiscard?.seat ===
                                            meld.calledDiscard?.seat &&
                                        existingMeld.calledDiscard?.tile ===
                                            meld.calledDiscard?.tile &&
                                        existingMeld.tiles.every(
                                            (tile) =>
                                                meld.tiles.some(
                                                    (meldTile) =>
                                                        getNormalizeTile(
                                                            meldTile,
                                                        ) ===
                                                        getNormalizeTile(
                                                            tile,
                                                        ),
                                                ),
                                        ),
                                );

                            if (
                                meldIndex < 0
                            ) {
                                return {
                                    ...player,
                                    hand: newHand,
                                };
                            }

                            const newMelds = [
                                ...player.melds,
                            ];

                            newMelds[
                                meldIndex
                            ] = meld;

                            return {
                                ...player,

                                hand:
                                    newHand,

                                melds:
                                    newMelds,
                            };
                        }

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