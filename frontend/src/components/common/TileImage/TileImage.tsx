import type { Tile } from "@/types/tile";

import "./TileImage.css";

interface TileImageProps {
    tile: Tile;

    selected?: boolean;

    sideways?: boolean;

    clickable?: boolean;

    disabled?: boolean;

    onClick?: (tile: Tile) => void;
}

export const TileImage = ({
    tile,
    selected = false,
    sideways = false,
    clickable = true,
    disabled = false,
    onClick,
}: TileImageProps) => {
    const className = [
        "tile",
        selected && "selected",
        sideways && "sideways",
        disabled && "disabled",
    ]
        .filter(Boolean)
        .join(" ");

    const imageDir = sideways
        ? "sideways"
        : "normal";

    const imageFileName =
        tile.type === "?"
            ? "back"
            : tile.type;

    const image = (
        <img
            className="tile-image"
            src={`/tiles/${imageDir}/${imageFileName}.png`}
            alt={tile.type}
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
            disabled={disabled}
            onClick={() => onClick?.(tile)}
        >
            {image}
        </button>
    );
};