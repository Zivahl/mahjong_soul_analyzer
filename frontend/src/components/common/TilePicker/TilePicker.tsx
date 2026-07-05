import { Tile } from "@/components/common/Tile/Tile";
import { TILES } from "@/constants/tiles";

import type { TileId } from "@/types/tile";

import "./TilePicker.css";

interface TilePickerProps {
    selectedTiles?: TileId[];

    onTileClick?: (tile: TileId) => void;
}

export const TilePicker = ({
    selectedTiles = [],
    onTileClick,
}: TilePickerProps) => {
    return (
        <div className="tile-picker">
            {TILES.map((tile) => (
                <Tile
                    key={tile.id}
                    tile={tile.id}
                    selected={selectedTiles.includes(tile.id)}
                    onClick={onTileClick}
                />
            ))}
        </div>
    );
};