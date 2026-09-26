import type { Seat, Meld } from "@/types/player";

export type ActionType =
    | "pon"
    | "chi"
    | "kan"
    | "tsumo"
    | "discard"
    | "ron"
    | "dora";

export interface ModalAnchor {
    x: number;

    y: number;
}

export interface ActionRequestBase {

    action: ActionType;
}

export interface PlayerActionRequestBase
    extends ActionRequestBase {
    
    seat: Seat;
}

export interface PonActionRequest
    extends PlayerActionRequestBase {

    action: "pon";

//    patterns: MeldChoicePattern[];
}

export interface ChiActionRequest
    extends PlayerActionRequestBase {

    action: "chi";

//    patterns: MeldChoicePattern[];
}

export interface KanActionRequest
    extends PlayerActionRequestBase {

    action: "kan";

//    patterns: MeldChoicePattern[];
}

export interface TsumoActionRequest
    extends PlayerActionRequestBase {

    action: "tsumo";
}

export interface DiscardActionRequest
    extends PlayerActionRequestBase {

    action: "discard";
}

export interface RonActionRequest
    extends PlayerActionRequestBase {

    action: "ron";
}

export interface DoraActionRequest
    extends ActionRequestBase {

    action: "dora";
}

export type PlayerActionRequest =
    | PonActionRequest
    | ChiActionRequest
    | KanActionRequest
    | TsumoActionRequest
    | DiscardActionRequest
    | RonActionRequest;

export type ActionRequest =
    | PlayerActionRequest
    | DoraActionRequest;  

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

export interface MeldChoicePattern {
    id: string;

    meld: Meld;
}
