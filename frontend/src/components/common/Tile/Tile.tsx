import type { TileId } from "@/types/tile";

import "./Tile.css";

interface TileProps {
    tile: TileId;

    selected?: boolean;

    onClick?: (tile: TileId) => void;
}

export const Tile = ({
    tile,
    selected = false,
    onClick,
}: TileProps) => {
    return (
        <button
            type="button"
            className={
                selected
                    ? "tile selected"
                    : "tile"
            }
            onClick={() => onClick?.(tile)}
        >
            <img
                src={`/tiles/${tile}.png`}
                alt={tile}
            />
        </button>
    );
};