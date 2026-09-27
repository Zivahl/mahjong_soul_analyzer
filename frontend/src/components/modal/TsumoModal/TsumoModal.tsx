import { TileImage } from "@/components/common/TileImage/TileImage";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { ModalAnchor } from "@/types/modal";
import type { Tile } from "@/types/tile";

import "./TsumoModal.css";


interface Props {
    title: string;

    anchor: ModalAnchor;

    selectedTile: Tile | null;

    onSelect: (
        tile: Tile,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}


export const TsumoModal = ({
    title,
    anchor,
    selectedTile,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {
    const handleTileClick = (
        tile: Tile,
    ) => {
        onSelect(tile);
    };

    return (
        <div className="tsumo-modal-overlay">

            <div
                className="tsumo-modal"
                style={{
                    left: anchor.x,
                    top: anchor.y,
                }}
            >

                <h2 className="tsumo-modal-title">
                    {title}
                </h2>

                <div className="tsumo-modal-body">

                    <div className="selected-tsumo">

                        {selectedTile ? (
                            <TileImage
                                tile={selectedTile}
                            />
                        ) : (
                            <div className="tsumo-placeholder">
                                未選択
                            </div>
                        )}

                    </div>

                    <TilePicker
                        selectionMode="single"
                        onTileClick={
                            handleTileClick
                        }
                    />

                </div>

                <div className="tsumo-modal-footer">

                    <button
                        onClick={onCancel}
                    >
                        キャンセル
                    </button>

                    <button
                        disabled={
                            !selectedTile
                        }
                        onClick={onConfirm}
                    >
                        確定
                    </button>

                </div>

            </div>

        </div>
    );
};