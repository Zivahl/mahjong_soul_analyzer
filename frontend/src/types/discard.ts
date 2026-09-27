import type { Tile } from "@/types/tile";

export type DiscardType =
    | "tedashi"
    | "tsumogiri";

export interface Discard {
    tile: Tile;

    type: DiscardType;

    riichi: boolean;
}