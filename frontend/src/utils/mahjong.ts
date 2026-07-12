import type { Seat } from "@/types/player";

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

export const SEAT_INDEX: Record<Seat, number> = {
    self: 0,
    shimocha: 1,
    toimen: 2,
    kamicha: 3,
};

export const getPlayerWind = (
    dealerSeat: Seat,
    playerSeat: Seat,
): Wind => {
    const dealerIndex =
        SEAT_INDEX[dealerSeat];

    const playerIndex =
        SEAT_INDEX[playerSeat];

    return WINDS[
        (playerIndex - dealerIndex + 4) % 4
    ];
};