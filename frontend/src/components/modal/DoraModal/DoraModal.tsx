import { Tile } from "@/components/common/Tile/Tile";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type {
    ModalAnchor,
} from "@/types/analysis";
import type {
    TileId,
} from "@/types/tile";

import "./DoraModal.css";


interface Props {
    title: string;

    anchor: ModalAnchor;

    selectedTile: TileId | null;

    onSelect: (
        tile: TileId,
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
                            <Tile
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
                        selectedTile={
                            selectedTile
                        }
                        onTileClick={
                            onSelect
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