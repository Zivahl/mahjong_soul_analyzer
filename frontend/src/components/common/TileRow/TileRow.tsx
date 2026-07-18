import { Tile } from "@/components/common/Tile/Tile";

import type { TileId } from "@/types/tile";

import "./TileRow.css";

export interface TileRowItem {
    tile: TileId;

    sideways?: boolean;

    selected?: boolean;
}

interface Props {
    tiles: TileRowItem[];

    clickable?: boolean;

    onTileClick?: (
        tile: TileId,
        index: number,
    ) => void;
}

export const TileRow = ({
    tiles,
    clickable = false,
    onTileClick,
}: Props) => {
    return (
        <div className="tile-row">
            {tiles.map(
                (
                    item,
                    index,
                ) => (
                    <Tile
                        key={`${item.tile}-${index}`}
                        tile={item.tile}
                        sideways={item.sideways}
                        selected={item.selected}
                        clickable={clickable}
                        onClick={() =>
                            onTileClick?.(
                                item.tile,
                                index,
                            )
                        }
                    />
                ),
            )}
        </div>
    );
};