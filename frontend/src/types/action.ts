import type { Meld } from "@/types/meld";
import type { Seat } from "@/types/seat";

export type ActionType =
    | "tsumo"
    | "discard"
    | "pon"
    | "chi"
    | "kan"
    | "tsumohora"
    | "ronhora"
    | "dora";

export interface ActionRequestBase {

    action: ActionType;
}

export interface PlayerActionRequestBase
    extends ActionRequestBase {
    
    seat: Seat;
}

export interface TsumoActionRequest
    extends PlayerActionRequestBase {

    action: "tsumo";
}

export interface DiscardActionRequest
    extends PlayerActionRequestBase {

    action: "discard";
}

export interface PonActionRequest
    extends PlayerActionRequestBase {

    action: "pon";
}

export interface ChiActionRequest
    extends PlayerActionRequestBase {

    action: "chi";
}

export interface KanActionRequest
    extends PlayerActionRequestBase {

    action: "kan";
}

export interface TsumoHoraActionRequest
    extends PlayerActionRequestBase {

    action: "tsumohora";
}

export interface RonHoraActionRequest
    extends PlayerActionRequestBase {

    action: "ronhora";
}

export interface DoraActionRequest
    extends ActionRequestBase {

    action: "dora";
}

export type PlayerActionRequest =
    | TsumoActionRequest
    | DiscardActionRequest
    | PonActionRequest
    | ChiActionRequest
    | KanActionRequest
    | TsumoHoraActionRequest
    | RonHoraActionRequest;

export type ActionRequest =
    | PlayerActionRequest
    | DoraActionRequest;  

export interface PlayerActionState {
    pon: boolean;

    chi: boolean;

    kan: boolean;

    tsumohora: boolean;

    ronhora: boolean;
}

export interface MeldChoicePattern {
    id: string;

    meld: Meld;
}
