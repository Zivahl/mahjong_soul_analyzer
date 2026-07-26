import type { Seat } from "@/types/player";
import type { TileId } from "@/types/tile";

export type ActionType =
    | "pon"
    | "chi"
    | "kan"
    | "tsumo"
    | "discard"
    | "ron";

export interface ModalAnchor {
    x: number;

    y: number;
}

export interface PlayerActionRequest {
    seat: Seat;

    action: ActionType;

    from?: Seat;

    tile?: TileId;

    anchor: ModalAnchor;
}

export type DiscardType =
    | "tedashi"
    | "tsumogiri";

export interface PlayerActionState {
    pon: boolean;

    chi: boolean;

    kan: boolean;

    ron: boolean;

    tsumo: boolean;
}

export interface PlayerActionEvent {
    seat: Seat;

    action: ActionType;
}

export interface MeldTile {
    tile: TileId;

    sideways?: boolean;
}

export interface MeldChoicePattern {
    id: string;

    tiles: MeldTile[];

    from: Seat;
}