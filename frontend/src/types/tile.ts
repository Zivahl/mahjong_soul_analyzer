import { TILE_IDS } from "@/constants/tiles";

export type TileId = (typeof TILE_IDS)[number];

export interface Tile {
    id: TileId;

    imagePath: string;
}

export type TileSelectionMode =
    | "single"
    | "multiple";

export type TilePickerSource =
    | "all"
    | "hand";