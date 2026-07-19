import type { TileId } from "@/types/tile";

export type Seat =
    | "self"
    | "shimocha"
    | "toimen"
    | "kamicha";

export interface PlayerState {
    id: number;

    seat: Seat;

    name: string;

    score: number;

    hand?: TileId[];

    discards: TileId[];

    melds: TileId[];
}
