import { Tile } from "@/components/common/Tile/Tile";

import type { TileId } from "@/types/tile";

import "./SelectedTileList.css";

interface SelectedTileListProps {
    tiles: TileId[];

    onTileClick?: (tile: TileId, index: number) => void;
}

export const SelectedTileList = ({
    tiles,
    onTileClick,
}: SelectedTileListProps) => {
    return (
        <div className="selected-tile-list">
            {tiles.map((tile, index) => (
                <Tile
                    key={`${tile}-${index}`}
                    tile={tile}
                    onClick={() =>
                        onTileClick?.(tile, index)
                    }
                />
            ))}
        </div>
    );
};