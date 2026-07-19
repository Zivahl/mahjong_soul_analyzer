import { Tile } from "@/components/common/Tile/Tile";

import { TILES } from "@/constants/tiles";

import type { TileId, TileSelectionMode, } from "@/types/tile";

import "./TilePicker.css";

interface TilePickerProps {
    selectionMode?: TileSelectionMode;

    selectedTile?: TileId | null;

    selectedTiles?: TileId[];

    onTileClick?: (
        tile: TileId,
    ) => void;
}

export const TilePicker = ({
    selectionMode = "multiple",
    selectedTile = null,
    selectedTiles = [],
    onTileClick,
}: TilePickerProps) => {

    const isSelected = (
        tile: TileId,
    ) => {
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
        <div className="tile-picker">
            {TILES.map((tile) => (
                <Tile
                    key={tile.id}
                    tile={tile.id}
                    selected={isSelected(tile.id)}
                    onClick={onTileClick}
                />
            ))}
        </div>
    );
};