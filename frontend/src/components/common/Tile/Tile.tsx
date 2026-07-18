import type { TileId } from "@/types/tile";

import "./Tile.css";

interface TileProps {
    tile: TileId;

    selected?: boolean;

    sideways?: boolean;

    clickable?: boolean;

    onClick?: (tile: TileId) => void;
}

export const Tile = ({
    tile,
    selected = false,
    sideways = false,
    clickable = true,
    onClick,
}: TileProps) => {
    const className = [
        "tile",
        selected && "selected",
        sideways && "sideways",
    ]
        .filter(Boolean)
        .join(" ");

    const imageDir = sideways
        ? "sideways"
        : "normal";

    const image = (
        <img
            className="tile-image"
            src={`/tiles/${imageDir}/${tile}.png`}
            alt={tile}
        />
    );

    if (!clickable) {
        return (
            <div className={className}>
                {image}
            </div>
        );
    }

    return (
        <button
            type="button"
            className={className}
            onClick={() => onClick?.(tile)}
        >
            {image}
        </button>
    );
};