import type { Seat } from "@/types/seat";
import type { Tile } from "@/types/tile";

export type MeldType =
    | "pon"
    | "chi"
    | "kan";

export type KanType =
    | "daiminkan"
    | "kakan"
    | "ankan";

export interface Meld {
    type: MeldType;

    kanType?: KanType;

    tiles: Tile[];

    calledDiscard?: {
        seat: Seat,
        tile: Tile,
    }
}