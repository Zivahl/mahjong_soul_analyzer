import type { Seat, Meld } from "@/types/player";
import type { Wind } from "@/types/match";
import type { TileId } from "@/types/tile";
import type { DiscardType } from "@/types/analysis";

export interface InitializePlayerState {

    seat: Seat;

    name: string;

    score: number;

    hand: TileId[];
}

export interface InitializeRoundEvent {

    type: "initializeRound";

    roundWind: Wind;

    roundNumber: 1 | 2 | 3 | 4;

    dealerSeat: Seat;

    currentTurn: Seat;

    remainingTiles: number;

    honba: number;

    riichiSticks: number;

    doraIndicators: TileId[];

    players: InitializePlayerState[];
}

export interface PlayerEvent {
    seat: Seat;
}

export interface TsumoEvent
    extends PlayerEvent {

    type: "tsumo";

    tile: TileId;
}

export interface DiscardEvent
    extends PlayerEvent {

    type: "discard";

    tile: TileId;

    discardType: DiscardType;
}

export interface MeldEvent
    extends PlayerEvent {

    type: "meld";

    meld: Meld;
}

export interface DoraEvent {

    type: "dora";

    tile: TileId;
}

export type MatchEvent =
    | InitializeRoundEvent
    | TsumoEvent
    | DiscardEvent
    | MeldEvent
    | DoraEvent;