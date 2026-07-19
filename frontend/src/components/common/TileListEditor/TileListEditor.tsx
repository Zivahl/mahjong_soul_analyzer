import { SelectedTileList } from "@/components/common/SelectedTileList/SelectedTileList";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { TileId } from "@/types/tile";

import "./TileListEditor.css";

interface TileListEditorProps {
    tiles: TileId[];

    maxTiles: number;

    onChange: (tiles: TileId[]) => void;
}

export const TileListEditor = ({
    tiles,
    maxTiles,
    onChange,
}: TileListEditorProps) => {
    const addTile = (tile: TileId) => {
        if (tiles.length >= maxTiles) {
            return;
        }

        onChange([...tiles, tile]);
    };

    const removeTile = (_tile: TileId, index: number) => {
        onChange(
            tiles.filter((_, i) => i !== index),
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