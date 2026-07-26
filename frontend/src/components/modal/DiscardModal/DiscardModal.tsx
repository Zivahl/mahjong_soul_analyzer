import { Tile } from "@/components/common/Tile/Tile";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { ModalAnchor, DiscardType, } from "@/types/analysis";
import type { Seat } from "@/types/player";
import type { TileId } from "@/types/tile";

import "./DiscardModal.css";

interface Props {
    title: string;

    seat: Seat;

    anchor: ModalAnchor;

    hand: readonly TileId[];

    tsumoTile?: TileId;

    selectedTile: TileId | null;

    onSelect: (
        tile: TileId,
    ) => void;

    onConfirm: (
        discardType: DiscardType,
    ) => void;

    onCancel: () => void;
}

export const DiscardModal = ({
    title,
    seat,
    anchor,
    hand,
    tsumoTile,
    selectedTile,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {

    const handWithoutTsumo =
        tsumoTile !== undefined
            ? hand.slice(0, -1)
            : hand;

    return (
        <div className="discard-modal-overlay">

            <div
                className="discard-modal"
                style={{
                    left: anchor.x,
                    top: anchor.y,
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

                    {seat === "self" ? (
                        <div className="discard-picker">
                    
                            <TilePicker
                                source="hand"
                                selectionMode="single"
                                tiles={handWithoutTsumo}
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
                        disabled={!selectedTile}
                        onClick={() =>
                            onConfirm("tedashi")
                        }
                    >
                        手出し
                    </button>
                    
                    <button
                        disabled={!selectedTile}
                        onClick={() =>
                            onConfirm("tsumogiri")
                        }
                    >
                        ツモ切り
                    </button>

                </div>

            </div>

        </div>
    );
};