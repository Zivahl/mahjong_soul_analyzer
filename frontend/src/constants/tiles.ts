import type { TileType } from "@/types/tile";


export const TILE_TYPES = [
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

    "?",
] as const satisfies readonly TileType[];


export const SUITS = [
    "m",
    "p",
    "s",
] as const;


export const RED_TILE_TYPES = {
    "5m": "5mr",
    "5p": "5pr",
    "5s": "5sr",
} as const satisfies Partial<
    Record<TileType, TileType>
>;


export const SANMA_EXCLUDED_TILE_TYPES = [
    "2m",
    "3m",
    "4m",
] as const satisfies readonly TileType[];