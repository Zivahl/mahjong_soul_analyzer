import type { PlayerState } from "@/types/player";
import type { Seat } from "@/types/player";
import type { TileId } from "@/types/tile";

export type Wind = "東" | "南" | "西" | "北";

export interface MatchState {
    roundWind: Wind;

    roundNumber: 1 | 2 | 3 | 4;

    dealerSeat: Seat;

    remainingTiles: number;

    riichiSticks: number;

    honba: number;

    doraIndicators: TileId[];

    players: PlayerState[];
}