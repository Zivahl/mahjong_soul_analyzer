import { TILE_IDS } from "@/constants/tiles";

export type TileId = (typeof TILE_IDS)[number];

export type TileSelectionMode =
    | "single"
    | "multiple";

export type TilePickerSource =
    | "all"
    | "hand";