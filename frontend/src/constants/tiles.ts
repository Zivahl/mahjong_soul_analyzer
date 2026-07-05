import type {
    Tile,
    TileId,
} from "@/types/tile";

import { TILE_IDS } from "@/types/tile";

export const TILES: Tile[] =
    TILE_IDS.map((id: TileId) => ({
        id,

        imagePath: `/tiles/${id}.png`,
    }));