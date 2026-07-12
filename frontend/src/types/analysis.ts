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