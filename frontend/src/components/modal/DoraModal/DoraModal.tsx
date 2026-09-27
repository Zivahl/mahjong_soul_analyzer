import { TileImage } from "@/components/common/TileImage/TileImage";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { ModalAnchor } from "@/types/modal";
import type { Tile } from "@/types/tile";

import "./DoraModal.css";


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


export const DoraModal = ({
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
        <div className="dora-modal-overlay">

            <div
                className="dora-modal"
                style={{
                    left: anchor.x,
                    top: anchor.y,
                }}
            >

                <h2 className="dora-modal-title">
                    {title}
                </h2>

                <div className="dora-modal-body">

                    <div className="selected-dora">

                        {selectedTile ? (
                            <TileImage
                                tile={selectedTile}
                            />
                        ) : (
                            <div className="dora-placeholder">
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

                <div className="dora-modal-footer">

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