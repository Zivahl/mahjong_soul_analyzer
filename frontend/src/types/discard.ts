import type { TileId } from "@/types/tile";

export type DiscardType =
    | "tedashi"
    | "tsumogiri";

export interface Discard {
    tile: TileId;

    type: DiscardType;

    riichi: boolean;
}