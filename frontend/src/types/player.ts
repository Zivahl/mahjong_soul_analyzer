import type { Wind } from "@/types/match";

export type Seat =
    | "self"
    | "shimocha"
    | "toimen"
    | "kamicha";

export interface PlayerState {
    id: number;

    seat: Seat;

    name: string;

    wind: Wind;

    score: number;

    hand: string[];

    discards: string[];

    melds: string[];
}
