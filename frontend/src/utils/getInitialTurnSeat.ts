import { SEAT_ORDER } from "@/constants/seats"

import type { Seat } from "@/types/player";

export const getInitialTurnSeat = (
    dealerSeat: Seat,
    roundNumber: 1 | 2 | 3 | 4,
): Seat => {

    const dealerIndex =
        SEAT_ORDER.indexOf(
            dealerSeat,
        );

    return SEAT_ORDER[
        (
            dealerIndex +
            (roundNumber - 1)
        ) %
        SEAT_ORDER.length
    ];
};