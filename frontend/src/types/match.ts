import type { PlayerState } from "@/types/player";

export type Wind = "東" | "南" | "西" | "北";

export interface MatchState {
    roundWind: Wind;

    roundNumber: 1 | 2 | 3 | 4;

    dealer: Wind;

    riichiSticks: number;

    honba: number;

    doraIndicators: string[];

    players: PlayerState[];
}