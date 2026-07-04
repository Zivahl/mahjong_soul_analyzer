import type { Wind } from "@/types/match";

export interface PlayerState {
    id: number;

    name: string;

    wind: Wind;

    score: number;

    hand: string[];

    discards: string[];

    melds: string[];

    isDealer: boolean;
}
