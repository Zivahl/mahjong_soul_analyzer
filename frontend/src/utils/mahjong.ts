import { SUITS } from "@/constants/tiles"
import { SEAT_ORDER } from "@/constants/seats"
import type { Seat } from "@/types/player";
import type { TileId } from "@/types/tile";
import type { MeldTile, MeldChoicePattern } from "@/types/analysis";

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

const normalizeTile =
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

const getSeatDistance = (
    caller: Seat,
    from: Seat,
) => {

    const callerIndex =
        SEAT_ORDER.indexOf(caller);

    const fromIndex =
        SEAT_ORDER.indexOf(from);

    return (
        fromIndex -
        callerIndex +
        4
    ) % 4;
};

export const getSidewaysIndex = (
    caller: Seat,
    from: Seat,
): number => {

    const distance =
        getSeatDistance(
            caller,
            from,
        );


    return 3 - distance;
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
    caller: Seat,
    from: Seat,
    tile: TileId,
): MeldChoicePattern[] => {

    const normalizedTile =
        normalizeTile(
            tile,
        );

    const candidates =
        hand.filter(
            (candidate) =>
                normalizeTile(
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

    const pairs =
        ponCombinations(
            candidates,
        );

    for (
        const pair of pairs
    ) {

        const tiles: MeldTile[] = [
            {
                tile:
                    pair[0],
            },
            {
                tile:
                    pair[1],
            },
            {
                tile,
            },
        ];

        const sidewaysIndex =
            getSidewaysIndex(
                caller,
                from,
            );

        if (
            sidewaysIndex >= 0 &&
            sidewaysIndex < tiles.length
        ) {
            tiles[sidewaysIndex].sideways =
                true;
        }

        results.push({
            id:
                tiles
                    .map(
                        (tile) =>
                            tile.tile,
                    )
                    .join("_"),

            tiles,

            from,
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
    from: Seat,
    tile: TileId,
): MeldChoicePattern[] => {

    const normalizedTile =
        normalizeTile(
            tile,
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
                            normalizeTile(
                                handTile,
                            ) ===
                            normalizeTile(
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

            results.push({

                id:
                    [
                        tile,
                        ...combination,
                    ]
                        .map(
                            (tile) =>
                                tile,
                        )
                        .join("_"),

                tiles:[
                    {
                        tile,
                        sideways:true,
                    },
                    {
                        tile:
                            combination[0],
                    },
                    {
                        tile:
                            combination[1],
                    },
                ],

                from,
            });
        }
    }

    return results;
};