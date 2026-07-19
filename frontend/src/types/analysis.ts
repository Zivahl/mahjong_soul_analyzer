import type { Seat } from "@/types/player";
import type { TileId } from "@/types/tile";

export type ActionType =
    | "pon"
    | "chi"
    | "kan"
    | "ron"
    | "tsumo";

export interface PlayerActionState {
    pon: boolean;

    chi: boolean;

    kan: boolean;

    ron: boolean;

    tsumo: boolean;
}

export interface PlayerActionRequest {
    seat: Seat;

    action: ActionType;
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