import { SUITS } from "@/constants/tiles"
import { SEAT_ORDER } from "@/constants/seats"
import type { Seat, Meld } from "@/types/player";
import type { TileId } from "@/types/tile";
import type { MeldChoicePattern } from "@/types/analysis";

export type Wind =
    | "東"
    | "南"
    | "西"
    | "北";

export const WINDS: readonly Wind[] = [
    "東",
    "南",
    "西",
    "北",
];

export const getPlayerWind = (
    dealerSeat: Seat,
    playerSeat: Seat,
): Wind => {
    const dealerIndex =
        SEAT_ORDER.indexOf(dealerSeat);

    const playerIndex =
        SEAT_ORDER.indexOf(playerSeat);

    return WINDS[
        (playerIndex - dealerIndex + 4) % 4
    ];
};

export const getNormalizeTile =
    (
        tile: TileId,
    ): TileId => {

    switch (tile) {

        case "5mr":
            return "5m";

        case "5pr":
            return "5p";

        case "5sr":
            return "5s";

        default:
            return tile;
    }
};

export const ponCombinations = (
    tiles: TileId[],
): TileId[][] => {

    const result: TileId[][] = [];

    const keys =
        new Set<string>();


    for (
        let i = 0;
        i < tiles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < tiles.length;
            j++
        ) {

            const combination = [
                tiles[i],
                tiles[j],
            ];

            const key =
                combination
                    .slice()
                    .sort()
                    .join("_");

            if (
                keys.has(key)
            ) {
                continue;
            }

            keys.add(key);

            result.push(
                combination,
            );
        }
    }

    return result;
};

export const getPonPatterns = (
    hand: readonly TileId[],
    latestDiscard: {
        seat: Seat;
        tile: TileId;
    },
): MeldChoicePattern[] => {

    const normalizedTile =
        getNormalizeTile(
            latestDiscard.tile,
        );

    const candidates =
        hand.filter(
            (candidate) =>
                getNormalizeTile(
                    candidate,
                ) === normalizedTile,
        );

    if (
        candidates.length < 2
    ) {
        return [];
    }

    const results:
        MeldChoicePattern[] = [];

    const combinations =
        ponCombinations(
            candidates,
        );

    for (
        const combination of combinations
    ) {

        const tiles: TileId[] = [
            combination[0],
            combination[1],
        ];

        results.push({
            id:
                tiles.join("_"),

            meld: {
                type:
                    "pon",    

                tiles: 
                    tiles,

                calledDiscard:
                    latestDiscard,
            }
        });
    }

    return results;
};

export const chiCombinations = (
    tiles: TileId[][],
): TileId[][] => {

    const result: TileId[][] = [];

    const keys =
        new Set<string>();

    const generate = (
        index: number,
        current: TileId[],
    ) => {

        if (
            index === tiles.length
        ) {

            const key =
                current
                    .slice()
                    .sort()
                    .join("_");


            if (
                !keys.has(key)
            ) {
                keys.add(key);

                result.push(
                    current,
                );
            }

            return;
        }

        for (
            const tile of tiles[index]
        ) {

            generate(
                index + 1,
                [
                    ...current,
                    tile,
                ],
            );
        }
    };

    generate(
        0,
        [],
    );

    return result;
};

export const getChiPatterns = (
    hand: readonly TileId[],
    latestDiscard: {
        seat: Seat;
        tile: TileId;
    },
): MeldChoicePattern[] => {

    const normalizedTile =
        getNormalizeTile(
            latestDiscard.tile,
        );

    if (
        !SUITS.some(
            (suit) =>
                normalizedTile.endsWith(
                    suit,
                ),
        )
    ) {
        return [];
    }

    const suit =
        normalizedTile.slice(-1);

    const number =
        Number(
            normalizedTile.slice(0, 1),
        );

    const results:
        MeldChoicePattern[] = [];

    const patterns = [
        [
            number - 2,
            number - 1,
        ],
        [
            number - 1,
            number + 1,
        ],
        [
            number + 1,
            number + 2,
        ],
    ];

    for (
        const pattern of patterns
    ) {

        if (
            pattern.some(
                (n) =>
                    n < 1 ||
                    n > 9,
            )
        ) {
            continue;
        }

        const needed =
            pattern.map(
                (n) =>
                    `${n}${suit}` as TileId,
            );

        const candidates =
            needed.map(
                (neededTile) =>
                    hand.filter(
                        (handTile) =>
                            getNormalizeTile(
                                handTile,
                            ) ===
                            getNormalizeTile(
                                neededTile,
                            ),
                    ),
            );

        if (
            candidates.some(
                (tiles) =>
                    tiles.length === 0,
            )
        ) {
            continue;
        }

        const combinations =
            chiCombinations(
                candidates,
            );

        for (
            const combination of combinations
        ) {
            
            const tiles: TileId[] = [
                combination[0],
                combination[1],
            ];

            results.push({

                id:
                    tiles.join("_"),

                meld: {
                    type:
                        "chi",    
    
                    tiles: 
                        tiles,
    
                    calledDiscard:
                        latestDiscard,
                }
            });
        }
    }

    return results;
};

export const getKanPatterns = (
    hand: readonly TileId[],
    melds: readonly Meld[],
    caller: Seat,
    latestDiscard?: {
        seat: Seat;
        tile: TileId;
    },
): MeldChoicePattern[] => {

    const results:
        MeldChoicePattern[] = [];


    /*
     * 大明槓
     */
    if (latestDiscard) {

        const normalizedTile =
            getNormalizeTile(
                latestDiscard.tile,
            );

        const candidates =
            hand.filter(
                (candidate) =>
                    getNormalizeTile(
                        candidate,
                    ) ===
                    normalizedTile,
            );

        if (
            candidates.length >= 3 &&
            latestDiscard.seat !== caller
        ) {

            const tiles:
                TileId[] = [
                    candidates[0],
                    candidates[1],
                    candidates[2],
                ];

            results.push({

                id:
                    [
                        "daiminkan",
                        ...tiles,
                    ].join("_"),

                meld: {
                    type:
                        "kan",

                    kanType:
                        "daiminkan",

                    tiles: 
                        tiles,
    
                    calledDiscard:
                        latestDiscard,
                },
            });
        }
    }


    /*
     * 加槓
     */
    for (
        const meld of melds
    ) {

        if (
            meld.type !== "pon"
        ) {
            continue;
        }

        if (
            meld.tiles.length !== 2
        ) {
            continue;
        }

        const normalizedTile =
            getNormalizeTile(
                meld.tiles[0],
            );

        const candidate =
            hand.find(
                (tile) =>
                    getNormalizeTile(
                        tile,
                    ) ===
                    normalizedTile,
            );

        if (!candidate) {
            continue;
        }

        results.push({

            id:
                [
                    "kakan",
                    ...meld.tiles,
                ].join("_"),

            meld: {
                type:
                    "kan",

                kanType:
                    "kakan",

                tiles: [
                    meld.tiles[0],
                    meld.tiles[1],
                    candidate,
                ],

                calledDiscard: 
                    meld.calledDiscard,
            },
        });
    }


    /*
     * 暗槓
     */
    const tileGroups =
        new Map<
            TileId,
            TileId[]
        >();

    for (
        const tile of hand
    ) {

        const normalizedTile =
            getNormalizeTile(
                tile,
            );

        const group =
            tileGroups.get(
                normalizedTile,
            ) ?? [];

        group.push(tile);

        tileGroups.set(
            normalizedTile,
            group,
        );
    }


    for (
        const candidates of tileGroups.values()
    ) {

        if (
            candidates.length < 4
        ) {
            continue;
        }

        results.push({

            id:
                [
                    "ankan",
                    ...candidates,
                ].join("_"),

            meld: {
                type:
                    "kan",

                kanType:
                    "ankan",
                
                tiles:
                    candidates,
            },
        });
    }

    return results;
};