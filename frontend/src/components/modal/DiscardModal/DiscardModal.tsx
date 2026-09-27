import { useState } from "react";

import { TileImage } from "@/components/common/TileImage/TileImage";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { DiscardType } from "@/types/discard";
import type { ModalAnchor } from "@/types/modal";
import type { Seat } from "@/types/seat";
import type { Tile } from "@/types/tile";

import "./DiscardModal.css";

type SelectedPicker =
    | "hand"
    | "tsumo"
    | "all"
    | null;

interface Props {
    title: string;

    seat: Seat;

    anchor: ModalAnchor;

    hand: readonly Tile[];

    tsumoTile?: Tile;

    selectedTile: Tile | null;

    riichiDisabled: boolean;

    onSelect: (
        tile: Tile,
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
        selectedPicker,
        setSelectedPicker,
    ] = useState<SelectedPicker>(null);

    const [
        riichi,
        setRiichi,
    ] = useState(false);

    const handWithoutTsumo =
        tsumoTile !== undefined
            ? hand.slice(0, -1)
            : hand;

    const handleHandTileClick = (
        tile: Tile,
    ) => {
        setSelectedPicker("hand");
        onSelect(tile);
    };

    const handleTsumoTileClick = (
        tile: Tile,
    ) => {
        setSelectedPicker("tsumo");
        onSelect(tile);
    };

    const handleAllTileClick = (
        tile: Tile,
    ) => {
        setSelectedPicker("all");
        onSelect(tile);
    };

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
                            <TileImage
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
                                selectedTileId={
                                    selectedPicker === "hand"
                                        ? selectedTile?.id ?? null
                                        : null
                                }
                                onTileClick={
                                    handleHandTileClick
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
                                        selectedTileId={
                                            selectedPicker === "tsumo"
                                                ? selectedTile?.id ?? null
                                                : null
                                        }
                                        onTileClick={
                                            handleTsumoTileClick
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <TilePicker
                            source="all"
                            selectionMode="single"
                            selectedTileId={
                                selectedPicker === "all"
                                    ? selectedTile?.id ?? null
                                    : null
                            }
                            onTileClick={
                                handleAllTileClick
                            }
                        />
                    )}
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

                        <span>
                            リーチ
                        </span>
                    </label>

                    <button
                        onClick={onCancel}
                    >
                        キャンセル
                    </button>

                    <button
                        disabled={
                            !selectedTile ||
                            selectedPicker === "tsumo"
                        }
                        onClick={() =>
                            handleConfirm(
                                "tedashi",
                            )
                        }
                    >
                        手出し
                    </button>

                    <button
                        disabled={
                            !selectedTile ||
                            selectedPicker === "hand"
                        }
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