export const TILE_IDS = [
    "1m",
    "2m",
    "3m",
    "4m",
    "5m",
    "5mr",
    "6m",
    "7m",
    "8m",
    "9m",

    "1p",
    "2p",
    "3p",
    "4p",
    "5p",
    "5pr",
    "6p",
    "7p",
    "8p",
    "9p",

    "1s",
    "2s",
    "3s",
    "4s",
    "5s",
    "5sr",
    "6s",
    "7s",
    "8s",
    "9s",

    "E",
    "S",
    "W",
    "N",
    "P",
    "F",
    "C",

    "back",
] as const;

export type TileId = (typeof TILE_IDS)[number];

export interface Tile {
    id: TileId;

    imagePath: string;
}

export type TileSelectionMode =
    | "single"
    | "multiple";