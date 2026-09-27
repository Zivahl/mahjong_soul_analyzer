import type { ActionRequest, PlayerActionState } from "@/types/action";
import type { PlayerState } from "@/types/player";
import type { Seat, Wind } from "@/types/seat";
import type { Tile } from "@/types/tile";

export interface MatchState {
    roundWind: Wind;

    roundNumber: 1 | 2 | 3 | 4;

    dealerSeat: Seat;

    currentTurn: Seat;

    currentTsumo?: Tile;
    
    actionRequest?: ActionRequest;

    remainingTiles: number;

    riichiSticks: number;

    honba: number;

    doraIndicators: Tile[];

    players: PlayerState[];

    playerActions: Record<
        Seat,
        PlayerActionState
    >;
}