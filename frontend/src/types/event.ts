import type { Discard } from "@/types/discard";
import type { Meld } from "@/types/meld";
import type { Seat, Wind } from "@/types/seat";
import type { TileId } from "@/types/tile";

export type EventType =
    | "initializeRound"
    | "tsumo"
    | "discard"
    | "meld"
    | "dora"

export interface EventBase {

    type: EventType;
}

export interface InitializePlayerState {

    seat: Seat;

    name: string;

    score: number;

    hand: TileId[];
}

export interface InitializeRoundEvent
    extends EventBase {

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

export interface PlayerEvent
    extends EventBase {

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

    discard: Discard;
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