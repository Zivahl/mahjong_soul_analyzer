import { useState } from "react";
import { Tile } from "@/components/common/Tile/Tile";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import type { DiscardType } from "@/types/analysis";
import type { Seat } from "@/types/player";
import type { ModalAnchor } from "@/types/modal";
import type { TileId } from "@/types/tile";

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
        selectedPicker,
        setSelectedPicker,
    ] = useState<SelectedPicker>(null);

    const [
        selectedIndex,
        setSelectedIndex,
    ] = useState<number | null>(null);

    const [
        riichi,
        setRiichi,
    ] = useState(false);


    const handWithoutTsumo =
        tsumoTile !== undefined
            ? hand.slice(0, -1)
            : hand;


    const handleHandTileClick = (
        tile: TileId,
        index: number,
    ) => {

        setSelectedPicker("hand");
        setSelectedIndex(index);

        onSelect(tile);
    };


    const handleTsumoTileClick = (
        tile: TileId,
        index: number,
    ) => {

        setSelectedPicker("tsumo");
        setSelectedIndex(index);

        onSelect(tile);
    };


    const handleAllTileClick = (
        tile: TileId,
        index: number,
    ) => {

        setSelectedPicker("all");
        setSelectedIndex(index);

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
                                selectedIndex={
                                    selectedPicker === "hand"
                                        ? selectedIndex
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
                                        tiles={[tsumoTile]}
                                        selectedIndex={
                                            selectedPicker === "tsumo"
                                                ? selectedIndex
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
                            selectedIndex={
                                selectedPicker === "all"
                                    ? selectedIndex
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
                            handleConfirm("tedashi")
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
                            handleConfirm("tsumogiri")
                        }
                    >
                        ツモ切り
                    </button>

                </div>

            </div>

        </div>
    );
};