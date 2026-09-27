import { MeldTiles } from "@/components/common/MeldTiles/MeldTiles";

import type { ModalAnchor } from "@/types/modal";

import type { MeldChoicePattern } from "@/types/action";

import type { Seat } from "@/types/seat"

import "./MeldModal.css";

interface Props {
    title: string;

    caller: Seat,

    patterns: MeldChoicePattern[];

    selectedPatternId: string;

    anchor: ModalAnchor;

    onSelect: (
        patternId: string,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}

export const MeldModal = ({
    title,
    caller,
    patterns,
    selectedPatternId,
    anchor,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {

    return (
        <div className="meld-modal-overlay">

            <div
                className="meld-modal"
                style={{
                    left: anchor.x,
                    top: anchor.y,
                }}
            >

                <h2 className="meld-modal-title">
                    {title}
                </h2>

                <div className="meld-modal-body">

                    {patterns.map(
                        (pattern) => (
                            <button
                                key={pattern.id}
                                type="button"
                                className={
                                    pattern.id ===
                                    selectedPatternId
                                        ? "meld-pattern selected"
                                        : "meld-pattern"
                                }
                                onClick={() =>
                                    onSelect(
                                        pattern.id,
                                    )
                                }
                            >
                                <div className="meld-radio">

                                    <input
                                        type="radio"
                                        checked={
                                            pattern.id ===
                                            selectedPatternId
                                        }
                                        readOnly
                                    />

                                </div>

                                <MeldTiles
                                    caller={
                                        caller
                                    }
                                    meld={
                                        pattern.meld
                                    }
                                />

                            </button>
                        ),
                    )}

                </div>

                <div className="meld-modal-footer">

                    <button
                        onClick={onCancel}
                    >
                        キャンセル
                    </button>

                    <button
                        onClick={onConfirm}
                    >
                        確定
                    </button>

                </div>

            </div>

        </div>
    );
};