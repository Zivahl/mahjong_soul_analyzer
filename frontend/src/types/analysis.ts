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

export interface ActionRequestBase {

    seat: Seat;

    action: ActionType;

    anchor: ModalAnchor;
}

export interface PonActionRequest
    extends ActionRequestBase {

    action: "pon";

    patterns: MeldChoicePattern[];
}

export interface ChiActionRequest
    extends ActionRequestBase {

    action: "chi";

    patterns: MeldChoicePattern[];
}

export interface KanActionRequest
    extends ActionRequestBase {

    action: "kan";

    patterns: MeldChoicePattern[];
}

export interface TsumoActionRequest
    extends ActionRequestBase {

    action: "tsumo";
}

export interface DiscardActionRequest
    extends ActionRequestBase {

    action: "discard";
}

export interface RonActionRequest
    extends ActionRequestBase {

    action: "ron";
}

export type PlayerActionRequest =
    | PonActionRequest
    | ChiActionRequest
    | KanActionRequest
    | TsumoActionRequest
    | DiscardActionRequest
    | RonActionRequest;
    

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