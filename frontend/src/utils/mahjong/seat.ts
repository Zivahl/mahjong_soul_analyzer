import { SEAT_ORDER, WIND_ORDER } from "@/constants/seats"

import type { Seat, Wind } from "@/types/seat";

export const getInitialTurnSeat = (
    dealerSeat: Seat,
    roundNumber: 1 | 2 | 3 | 4,
): Seat => {

    const dealerIndex =
        SEAT_ORDER.indexOf(dealerSeat);

    return SEAT_ORDER[
        (dealerIndex + (roundNumber - 1)) 
        % SEAT_ORDER.length
    ];
};

export const getNextSeat = (
    seat: Seat,
): Seat => {

    const index =
        SEAT_ORDER.indexOf(seat);

    return SEAT_ORDER[
        (index + SEAT_ORDER.length + 1)
        % SEAT_ORDER.length
    ];
};

export const getPlayerWind = (
    dealerSeat: Seat,
    playerSeat: Seat,
): Wind => {
    const dealerIndex =
        SEAT_ORDER.indexOf(dealerSeat);

    const playerIndex =
        SEAT_ORDER.indexOf(playerSeat);

    return WIND_ORDER[
        (playerIndex - dealerIndex + SEAT_ORDER.length) 
        % SEAT_ORDER.length
    ];
};

const getSeatDistance = (
    caller: Seat,
    from: Seat,
) => {

    const callerIndex =
        SEAT_ORDER.indexOf(caller);

    const fromIndex =
        SEAT_ORDER.indexOf(from);

    return (fromIndex - callerIndex + SEAT_ORDER.length ) % SEAT_ORDER.length;
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

    return (SEAT_ORDER.length - 1) - distance;
};