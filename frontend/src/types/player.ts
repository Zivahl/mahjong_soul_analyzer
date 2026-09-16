import type { TileId } from "@/types/tile";
import type { DiscardType } from "@/types/analysis";

export type Seat =
    | "self"
    | "shimocha"
    | "toimen"
    | "kamicha";

export interface Discard {
    tile: TileId;

    type: DiscardType;
}

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

    tiles: TileId[];

    calledDiscard?: {
        seat: Seat,
        tile: TileId,
    }
}

export interface PlayerState {
    id: number;

    seat: Seat;

    name: string;

    score: number;

    hand: TileId[];

    discards: Discard[];

    melds: Meld[];
}

