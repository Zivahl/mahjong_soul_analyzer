import {
    useState,
} from "react";

import {
    Tile,
} from "@/components/common/Tile/Tile";

import {
    TilePicker,
} from "@/components/common/TilePicker/TilePicker";

import type {
    DiscardType,
} from "@/types/analysis";

import type {
    Seat,
} from "@/types/player";

import type {
    ModalAnchor,
} from "@/types/modal";

import type {
    TileId,
} from "@/types/tile";

import "./DiscardModal.css";

interface Props {
    title: string;

    seat: Seat;

    anchor: ModalAnchor;

    hand: readonly TileId[];

    tsumoTile?: TileId;

    selectedTile: TileId | null;

    riichiDisabled: boolean;

    onSelect: (
        tile: TileId,
    ) => void;

    onConfirm: (
        discardType: DiscardType,
        riichi: boolean,
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
    riichiDisabled,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {

    const [
        riichi,
        setRiichi,
    ] = useState(false);

    const handWithoutTsumo =
        tsumoTile !== undefined
            ? hand.slice(0, -1)
            : hand;

    const handleConfirm = (
        discardType: DiscardType,
    ) => {
        onConfirm(
            discardType,
            riichi,
        );
    };

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

                    <div className="discard-picker">

                        {seat === "self" ? (
                            <>
                                <TilePicker
                                    source="hand"
                                    selectionMode="single"
                                    tiles={
                                        handWithoutTsumo
                                    }
                                    selectedTile={
                                        selectedTile
                                    }
                                    onTileClick={
                                        onSelect
                                    }
                                />

                                {tsumoTile && (
                                    <div className="discard-tsumo">
                                        <TilePicker
                                            source="hand"
                                            selectionMode="single"
                                            tiles={[
                                                tsumoTile,
                                            ]}
                                            selectedTile={
                                                selectedTile
                                            }
                                            onTileClick={
                                                onSelect
                                            }
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <TilePicker
                                source="all"
                                selectionMode="single"
                                selectedTile={
                                    selectedTile
                                }
                                onTileClick={
                                    onSelect
                                }
                            />
                        )}

                    </div>

                </div>

                <div className="discard-modal-footer">

                    <label className="discard-riichi">
                        <input
                            type="checkbox"
                            checked={riichi}
                            disabled={riichiDisabled}
                            onChange={(event) =>
                                setRiichi(
                                    event.target.checked,
                                )
                            }
                        />
                        <span>リーチ</span>
                    </label>

                    <button
                        onClick={onCancel}
                    >
                        キャンセル
                    </button>

                    <button
                        disabled={!selectedTile}
                        onClick={() =>
                            handleConfirm(
                                "tedashi",
                            )
                        }
                    >
                        手出し
                    </button>

                    <button
                        disabled={!selectedTile}
                        onClick={() =>
                            handleConfirm(
                                "tsumogiri",
                            )
                        }
                    >
                        ツモ切り
                    </button>

                </div>

            </div>

        </div>
    );
};