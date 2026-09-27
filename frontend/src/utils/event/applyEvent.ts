import type { MatchState } from "@/types/match";

import type {
    MatchEvent,
    InitializeRoundEvent,
    TsumoEvent,
    DiscardEvent,
    MeldEvent,
    DoraEvent,
} from "@/types/event";

import { calculatePlayerActions } from "@/utils/action/calculatePlayerActions";
import { createDefaultNextActionRequest } from "@/utils/action/createDefaultNextActionRequest";
import { normalizeTileType } from "@/utils/mahjong/tile";

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

        case "dora":
            nextState =
                applyDora(
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

    const actionRequest =
        createDefaultNextActionRequest(
            nextState,
            nextEvents,
        );

    return {
        ...nextState,

        actionRequest,

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
                                candidate.seat ===
                                player.seat,
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
                                : {
                                      id: null,
                                      type: "?",
                                  },
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
    const discard =
        event.discard;

    const player =
        state.players.find(
            (player) =>
                player.seat ===
                event.seat,
        );

    if (!player) {
        return state;
    }

    let hand = player.hand;

    if (event.seat === "self") {
        switch (discard.type) {
            case "tedashi":
                hand = hand.filter(
                    (tile) =>
                        tile.id !==
                        discard.tile.id,
                );
                break;

            case "tsumogiri":
                hand = hand.slice(0, -1);
                break;
        }
    } else {
        hand = hand.slice(0, -1);
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
                                          discard.tile,

                                      type:
                                          discard.type,

                                      riichi:
                                          discard.riichi,
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

    if (!callerPlayer) {
        return state;
    }

    if (
        meld.kanType !== "ankan" &&
        !fromPlayer
    ) {
        return state;
    }

    const meldTileIds =
        new Set(
            meld.tiles.map(
                (tile) => tile.id,
            ),
        );

    const newHand =
        callerPlayer.hand.filter(
            (tile) =>
                !meldTileIds.has(
                    tile.id,
                ),
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
                        player.seat !==
                        caller
                    ) {
                        return player;
                    }

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
                                    existingMeld.calledDiscard?.tile.id ===
                                        meld.calledDiscard?.tile.id &&
                                    existingMeld.tiles.every(
                                        (tile) =>
                                            meld.tiles.some(
                                                (meldTile) =>
                                                    normalizeTileType(
                                                        meldTile.type,
                                                    ) ===
                                                    normalizeTileType(
                                                        tile.type,
                                                    ),
                                            ),
                                    ),
                            );

                        if (
                            meldIndex < 0
                        ) {
                            return {
                                ...player,

                                hand:
                                    newHand,
                            };
                        }

                        const newMelds =
                            player.melds.map(
                                (
                                    existingMeld,
                                    index,
                                ) =>
                                    index ===
                                    meldIndex
                                        ? meld
                                        : existingMeld,
                            );

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
                },
            ),
    };
};

const applyDora = (
    state: MatchState,
    event: DoraEvent,
): MatchState => {
    return {
        ...state,

        doraIndicators: [
            ...state.doraIndicators,
            event.tile,
        ],
    };
};