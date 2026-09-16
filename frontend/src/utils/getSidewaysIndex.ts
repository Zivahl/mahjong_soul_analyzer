import type { Seat } from "@/types/player";

import { SEAT_ORDER } from "@/constants/seats";


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