import type { Seat, Meld } from "@/types/player";
import type { TileId } from "@/types/tile";
import type { DiscardType } from "@/types/analysis";

export interface BaseEvent {
    seat: Seat;
}

export interface TsumoEvent
    extends BaseEvent {

    type: "tsumo";

    tile: TileId;
}

export interface DiscardEvent
    extends BaseEvent {

    type: "discard";

    tile: TileId;

    discardType: DiscardType;
}

export interface MeldEvent
    extends BaseEvent {

    type: "meld";

    meld: Meld;
}

export type MatchEvent =
    | TsumoEvent
    | DiscardEvent
    | MeldEvent;