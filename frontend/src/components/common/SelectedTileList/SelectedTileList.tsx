import { TileImage } from "@/components/common/TileImage/TileImage";

import type { Tile } from "@/types/tile";

import "./SelectedTileList.css";


interface SelectedTileListProps {
    tiles: Tile[];

    onTileClick?: (
        tile: Tile,
    ) => void;
}


export const SelectedTileList = ({
    tiles,
    onTileClick,
}: SelectedTileListProps) => {
    return (
        <div className="selected-tile-list">
            {tiles.map((tile) => (
                <TileImage
                    key={tile.id}
                    tile={tile}
                    onClick={() =>
                        onTileClick?.(tile)
                    }
                />
            ))}
        </div>
    );
};