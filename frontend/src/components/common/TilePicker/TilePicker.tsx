import { TileImage } from "@/components/common/TileImage/TileImage";

import {
    TILE_TYPES,
} from "@/constants/tiles";

import type {
    Tile,
    TilePickerSource,
    TileSelectionMode,
} from "@/types/tile";

import "./TilePicker.css";

interface TilePickerProps {
    selectionMode?: TileSelectionMode;

    source?: TilePickerSource;

    tiles?: readonly Tile[];

    selectedTileId?: Tile["id"] | null;

    selectedTiles?: readonly Tile[];

    onTileClick?: (
        tile: Tile,
    ) => void;
}

export const TilePicker = ({
    selectionMode = "multiple",
    source = "all",
    tiles = [],
    selectedTileId = null,
    selectedTiles = [],
    onTileClick,
}: TilePickerProps) => {

    const getDisplayTiles = (): readonly Tile[] => {

        if (source === "hand") {
            return tiles;
        }

        return TILE_TYPES
            .filter(
                (tileType) =>
                    tileType !== "?",
            )
            .map(
                (tileType) => {

                    const availableTiles =
                        tiles.filter(
                            (tile) =>
                                tile.type ===
                                tileType,
                        );

                    if (
                        availableTiles.length === 0
                    ) {
                        return {
                            id: null,
                            type: tileType,
                        };
                    }

                    return [...availableTiles]
                        .sort(
                            (a, b) => {
                                if (a.id === null) {
                                    return 1;
                                }

                                if (b.id === null) {
                                    return -1;
                                }

                                return a.id - b.id;
                            },
                        )[0];
                },
            );
    };

    const isAvailable = (
        tile: Tile,
    ): boolean => {

        if (source === "hand") {
            return true;
        }

        return tile.id !== null;
    };

    const isSelected = (
        tile: Tile,
    ): boolean => {

        if (!isAvailable(tile)) {
            return false;
        }

        if (
            selectionMode === "single"
        ) {
            return (
                selectedTileId ===
                tile.id
            );
        }

        return selectedTiles.some(
            (selectedTile) =>
                selectedTile.id ===
                tile.id,
        );
    };

    const handleTileClick = (
        tile: Tile,
    ) => {

        if (!isAvailable(tile)) {
            return;
        }

        onTileClick?.(tile);
    };

    return (
        <div
            className={
                source === "all"
                    ? "tile-picker tile-picker-all"
                    : "tile-picker tile-picker-hand"
            }
        >
            {getDisplayTiles().map(
                (tile) => (
                    <TileImage
                        key={tile.type}
                        tile={tile}
                        selected={isSelected(tile)}
                        disabled={!isAvailable(tile)}
                        onClick={handleTileClick}
                    />
                ),
            )}
        </div>
    );
};