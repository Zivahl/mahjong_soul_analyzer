import { SelectedTileList } from "@/components/common/SelectedTileList/SelectedTileList";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { Tile } from "@/types/tile";

import "./TileListEditor.css";

interface TileListEditorProps {
    tiles: Tile[];

    maxTiles: number;

    onChange: (tiles: Tile[]) => void;
}

export const TileListEditor = ({
    tiles,
    maxTiles,
    onChange,
}: TileListEditorProps) => {
    const addTile = (tile: Tile) => {
        if (tiles.length >= maxTiles) {
            return;
        }

        onChange([...tiles, tile]);
    };

    const removeTile = (tile: Tile) => {
        onChange(
            tiles.filter(
                (currentTile) => currentTile.id !== tile.id,
            ),
        );
    };

    return (
        <div className="tile-list-editor">
            <SelectedTileList
                tiles={tiles}
                onTileClick={removeTile}
            />

            <TilePicker
                selectionMode="multiple"
                onTileClick={addTile}
            />
        </div>
    );
};