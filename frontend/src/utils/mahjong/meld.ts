import { SUITS } from "@/constants/tiles";

import type { MeldChoicePattern } from "@/types/action";
import type { Meld } from "@/types/meld";
import type { Seat } from "@/types/seat";
import type { Tile, TileType } from "@/types/tile";

import { normalizeTileType } from "./tile";

export const ponCombinations = (
    tiles: Tile[],
): Tile[][] => {
    const result: Tile[][] = [];

    const keys = new Set<string>();

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

            const key = combination
                .map((tile) => tile.id)
                .filter((id): id is number => id !== null)
                .sort((a, b) => a - b)
                .join("_");

            if (keys.has(key)) {
                continue;
            }

            keys.add(key);

            result.push(combination);
        }
    }

    return result;
};

export const getPonPatterns = (
    hand: readonly Tile[],
    latestDiscard: {
        seat: Seat;
        tile: Tile;
    },
): MeldChoicePattern[] => {
    const normalizedTileType =
        normalizeTileType(
            latestDiscard.tile.type,
        );

    const candidates = hand.filter(
        (candidate) =>
            normalizeTileType(
                candidate.type,
            ) === normalizedTileType,
    );

    if (candidates.length < 2) {
        return [];
    }

    const results: MeldChoicePattern[] = [];

    const combinations =
        ponCombinations(candidates);

    for (
        const combination of combinations
    ) {
        const tiles: Tile[] = [
            combination[0],
            combination[1],
        ];

        results.push({
            id: tiles
                .map((tile) => tile.id)
                .filter((id): id is number => id !== null)
                .sort((a, b) => a - b)
                .join("_"),

            meld: {
                type: "pon",
                tiles,
                calledDiscard: latestDiscard,
            },
        });
    }

    return results;
};

export const chiCombinations = (
    tiles: Tile[][],
): Tile[][] => {
    const result: Tile[][] = [];

    const keys = new Set<string>();

    const generate = (
        index: number,
        current: Tile[],
    ) => {
        if (index === tiles.length) {
            const key = current
                .map((tile) => tile.id)
                .filter((id): id is number => id !== null)
                .sort((a, b) => a - b)
                .join("_");

            if (!keys.has(key)) {
                keys.add(key);
                result.push(current);
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

    generate(0, []);

    return result;
};

export const getChiPatterns = (
    hand: readonly Tile[],
    latestDiscard: {
        seat: Seat;
        tile: Tile;
    },
): MeldChoicePattern[] => {
    const normalizedTileType =
        normalizeTileType(
            latestDiscard.tile.type,
        );

    if (
        !SUITS.some(
            (suit) =>
                normalizedTileType.endsWith(
                    suit,
                ),
        )
    ) {
        return [];
    }

    const suit =
        normalizedTileType.slice(-1);

    const number =
        Number(
            normalizedTileType.slice(0, 1),
        );

    const results: MeldChoicePattern[] = [];

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

        const neededTypes =
            pattern.map(
                (n) =>
                    `${n}${suit}` as TileType,
            );

        const candidates =
            neededTypes.map(
                (neededType) =>
                    hand.filter(
                        (handTile) =>
                            normalizeTileType(
                                handTile.type,
                            ) ===
                            normalizeTileType(
                                neededType,
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
            const tiles: Tile[] = [
                combination[0],
                combination[1],
            ];

            results.push({
                id: tiles
                    .map((tile) => tile.id)
                    .filter((id): id is number => id !== null)
                    .sort((a, b) => a - b)
                    .join("_"),

                meld: {
                    type: "chi",
                    tiles,
                    calledDiscard: latestDiscard,
                },
            });
        }
    }

    return results;
};

export const getKanPatterns = (
    hand: readonly Tile[],
    melds: readonly Meld[],
    caller: Seat,
    latestDiscard?: {
        seat: Seat;
        tile: Tile;
    },
): MeldChoicePattern[] => {
    const results: MeldChoicePattern[] = [];

    /*
     * 大明槓
     */
    if (latestDiscard) {
        const normalizedTileType =
            normalizeTileType(
                latestDiscard.tile.type,
            );

        const candidates = hand.filter(
            (candidate) =>
                normalizeTileType(
                    candidate.type,
                ) === normalizedTileType,
        );

        if (
            candidates.length >= 3 &&
            latestDiscard.seat !== caller
        ) {
            const tiles: Tile[] = [
                candidates[0],
                candidates[1],
                candidates[2],
            ];

            results.push({
                id: [
                    "daiminkan",
                    ...tiles
                        .map((tile) => tile.id)
                        .filter((id): id is number => id !== null)
                        .sort(
                            (a, b) => a - b,
                        ),
                ].join("_"),

                meld: {
                    type: "kan",
                    kanType: "daiminkan",
                    tiles,
                    calledDiscard: latestDiscard,
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
        if (meld.type !== "pon") {
            continue;
        }

        if (meld.tiles.length !== 2) {
            continue;
        }

        const normalizedTileType =
            normalizeTileType(
                meld.tiles[0].type,
            );

        const candidate =
            hand.find(
                (tile) =>
                    normalizeTileType(
                        tile.type,
                    ) === normalizedTileType,
            );

        if (!candidate) {
            continue;
        }

        results.push({
            id: [
                "kakan",
                ...meld.tiles
                    .map((tile) => tile.id)
                    .filter((id): id is number => id !== null)
                    .sort(
                        (a, b) => a - b,
                    ),
            ].join("_"),

            meld: {
                type: "kan",
                kanType: "kakan",
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
        new Map<TileType, Tile[]>();

    for (
        const tile of hand
    ) {
        const normalizedTileType =
            normalizeTileType(
                tile.type,
            );

        const group =
            tileGroups.get(
                normalizedTileType,
            ) ?? [];

        group.push(tile);

        tileGroups.set(
            normalizedTileType,
            group,
        );
    }

    for (
        const candidates of tileGroups.values()
    ) {
        if (candidates.length < 4) {
            continue;
        }

        results.push({
            id: [
                "ankan",
                ...candidates
                    .map((tile) => tile.id)
                    .filter((id): id is number => id !== null)
                    .sort(
                        (a, b) => a - b,
                    ),
            ].join("_"),

            meld: {
                type: "kan",
                kanType: "ankan",
                tiles: candidates,
            },
        });
    }

    return results;
};