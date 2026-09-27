import type { TileType } from "@/types/tile";

export const normalizeTileType =
    (
        type: TileType,
    ): TileType => {

    switch (type) {

        case "5mr":
            return "5m";

        case "5pr":
            return "5p";

        case "5sr":
            return "5s";

        default:
            return type;
    }
};