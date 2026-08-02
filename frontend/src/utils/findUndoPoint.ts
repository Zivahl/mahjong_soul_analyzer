import type { MatchEvent } from "@/types/event";


const hasSeat = (
    event: MatchEvent,
): event is Exclude<
    MatchEvent,
    { type: "initializeRound" }
> => {
    return (
        event.type !==
        "initializeRound"
    );
};


export const findUndoPoint = (
    events: readonly MatchEvent[],
): number => {

    let lastSeat =
        undefined;


    for (
        let i = events.length - 1;
        i >= 0;
        i--
    ) {

        const event =
            events[i];

        if (
            !hasSeat(event)
        ) {
            continue;
        }

        lastSeat =
            event.seat;

        break;
    }


    if (!lastSeat) {
        return events.length;
    }


    let index =
        events.length;


    while (index > 0) {

        const event =
            events[index - 1];


        if (
            !hasSeat(event)
        ) {
            break;
        }


        if (
            event.seat !== lastSeat
        ) {
            break;
        }


        index--;
    }


    return index;
};