import type { Seat } from "@/types/player";

import { SEAT_ORDER } from "@/constants/seats";


export const getPreviousSeat = (
    seat: Seat,
): Seat => {

    const index =
        SEAT_ORDER.indexOf(seat);

    return SEAT_ORDER[
        (index + SEAT_ORDER.length - 1)
        % SEAT_ORDER.length
    ];
};