import type { Discard } from "@/types/discard";
import type { Meld } from "@/types/meld";
import type { Seat } from "@/types/seat";
import type { TileId } from "@/types/tile";



export interface PlayerState {
    id: number;

    seat: Seat;

    name: string;

    score: number;

    hand: TileId[];

    discards: Discard[];

    melds: Meld[];
}

