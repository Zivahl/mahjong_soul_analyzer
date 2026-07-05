import type { TileId } from "@/types/tile";

export const toMortalTile = (
    tile: TileId,
): string => {
    return tile === "back"
        ? "?"
        : tile;
};

export const fromMortalTile = (
    tile: string,
): TileId => {
    return tile === "?"
        ? "back"
        : (tile as TileId);
};
