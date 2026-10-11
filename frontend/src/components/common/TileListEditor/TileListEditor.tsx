import { SelectedTileList } from "@/components/common/SelectedTileList/SelectedTileList";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { Tile } from "@/types/tile";

import "./TileListEditor.css";

interface TileListEditorProps {
    unrevealedTiles: Tile[];

    selectedTiles: Tile[];

    maxTiles: number;

    onChange: (tiles: Tile[]) => void;
}

export const TileListEditor = ({
    unrevealedTiles,
    selectedTiles,
    maxTiles,
    onChange,
}: TileListEditorProps) => {
    const addTile = (tile: Tile) => {
        if (selectedTiles.length >= maxTiles) {
            return;
        }

        onChange([...selectedTiles, tile]);
    };

    const removeTile = (tile: Tile) => {
        onChange(
            selectedTiles.filter(
                (currentTile) => currentTile.id !== tile.id,
            ),
        );
    };

    return (
        <div className="tile-list-editor">
            <SelectedTileList
                tiles={selectedTiles}
                onTileClick={removeTile}
            />

            <TilePicker
                selectionMode="multiple"
                tiles={unrevealedTiles}
                onTileClick={addTile}
            />
        </div>
    );
};