import { Tile } from "@/components/common/Tile/Tile";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type {
    ModalPlacement,
} from "@/types/analysis";
import type {
    TileId,
} from "@/types/tile";

import "./TsumoModal.css";


interface Props {
    placement: ModalPlacement;

    selectedTile: TileId | null;

    onSelect: (
        tile: TileId,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}


export const TsumoModal = ({
    placement,
    selectedTile,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {
    return (
        <div className="tsumo-modal-overlay">

            <div
                className="tsumo-modal"
                style={{
                    left: placement.x,
                    top: placement.y,
                    width: placement.width,
                }}
            >

                <h2 className="tsumo-modal-title">
                    ツモ牌設定
                </h2>

                <div className="tsumo-modal-body">

                    <div className="selected-tsumo">

                        {selectedTile ? (
                            <Tile
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
                        selectedTile={
                            selectedTile
                        }
                        onTileClick={
                            onSelect
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