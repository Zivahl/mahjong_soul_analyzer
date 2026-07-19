import { Tile } from "@/components/common/Tile/Tile";

import { TILE_IDS } from "@/constants/tiles";

import type { TileId, TileSelectionMode, TilePickerSource, } from "@/types/tile";

import "./TilePicker.css";

interface TilePickerProps {
    selectionMode?: TileSelectionMode;

    source?: TilePickerSource;

    tiles?: readonly TileId[];

    selectedTile?: TileId | null;

    selectedTiles?: readonly TileId[];

    onTileClick?: (
        tile: TileId,
    ) => void;
}

export const TilePicker = ({
    selectionMode = "multiple",
    source = "all",
    tiles = [],
    selectedTile = null,
    selectedTiles = [],
    onTileClick,
}: TilePickerProps) => {

    const getDisplayTiles = (): readonly TileId[] => {
        if (source === "all") {
            return TILE_IDS;
        }
    
        return tiles;
    };
    
    const isSelected = (
        tile: TileId,
    ): boolean => {
        if (
            selectionMode === "single"
        ) {
            return (
                selectedTile === tile
            );
        }
    
        return selectedTiles.includes(
            tile,
        );
    };

    return (
        <div
            className={
                source === "all"
                    ? "tile-picker tile-picker-all"
                    : "tile-picker tile-picker-hand"
            }
        >
            {getDisplayTiles().map((tile, index) => (
                <Tile
                    key={`${tile}-${index}`}
                    tile={tile}
                    selected={isSelected(tile)}
                    onClick={onTileClick}
                />
            ))}
        </div>
    );
};