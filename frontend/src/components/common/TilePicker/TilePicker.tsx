import { Tile } from "@/components/common/Tile/Tile";

import { TILE_IDS } from "@/constants/tiles";

import type {
    TileId,
    TileSelectionMode,
    TilePickerSource,
} from "@/types/tile";

import "./TilePicker.css";

interface TilePickerProps {
    selectionMode?: TileSelectionMode;

    source?: TilePickerSource;

    tiles?: readonly TileId[];

    selectedIndex?: number | null;

    selectedTiles?: readonly TileId[];

    onTileClick?: (
        tile: TileId,
        index: number,
    ) => void;
}

export const TilePicker = ({
    selectionMode = "multiple",
    source = "all",
    tiles = [],
    selectedIndex = null,
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
        index: number,
    ): boolean => {
        if (
            selectionMode === "single"
        ) {
            return (
                selectedIndex === index
            );
        }

        return selectedTiles.includes(
            tile,
        );
    };

    const handleTileClick = (
        tile: TileId,
        index: number,
    ) => {
        onTileClick?.(
            tile,
            index,
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
            {getDisplayTiles().map(
                (tile, index) => (
                    <Tile
                        key={`${tile}-${index}`}
                        tile={tile}
                        selected={isSelected(
                            tile,
                            index,
                        )}
                        onClick={() =>
                            handleTileClick(
                                tile,
                                index,
                            )
                        }
                    />
                ),
            )}
        </div>
    );
};