import { Tile } from "@/components/common/Tile/Tile";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { ModalPlacement } from "@/types/analysis";
import type { TileId } from "@/types/tile";

import "./DiscardModal.css";

interface Props {
    title: string;

    placement: ModalPlacement;

    hand?: readonly TileId[];

    tsumoTile?: TileId;

    selectedTile: TileId | null;

    onSelect: (
        tile: TileId,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}

export const DiscardModal = ({
    title,
    placement,
    hand,
    tsumoTile,
    selectedTile,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {
    return (
        <div className="discard-modal-overlay">

            <div
                className="discard-modal"
                style={{
                    left: placement.x,
                    top: placement.y,
                    width: placement.width,
                }}
            >

                <h2 className="discard-modal-title">
                    {title}
                </h2>

                <div className="discard-modal-body">

                    <div className="discard-selected">

                        {selectedTile ? (
                            <Tile
                                tile={selectedTile}
                            />
                        ) : (
                            <div className="discard-placeholder">
                                未選択
                            </div>
                        )}

                    </div>

                    {hand ? (
                        <div className="discard-picker">
                    
                            <TilePicker
                                source="hand"
                                selectionMode="single"
                                tiles={hand}
                                selectedTile={selectedTile}
                                onTileClick={onSelect}
                            />
                    
                            {tsumoTile && (
                                <div className="discard-tsumo">
                                    <TilePicker
                                        source="hand"
                                        selectionMode="single"
                                        tiles={[tsumoTile]}
                                        selectedTile={selectedTile}
                                        onTileClick={onSelect}
                                    />
                                </div>
                            )}
                    
                        </div>
                    ) : (
                        <TilePicker
                            source="all"
                            selectionMode="single"
                            selectedTile={selectedTile}
                            onTileClick={onSelect}
                        />
                    )}

                </div>

                <div className="discard-modal-footer">

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