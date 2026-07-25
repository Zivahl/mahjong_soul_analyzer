import { TileRow } from "@/components/common/TileRow/TileRow";

import type { MeldChoicePattern, ModalAnchor, } from "@/types/analysis";

import "./MeldChoiceModal.css";

interface Props {
    title: string;

    patterns: MeldChoicePattern[];

    selectedPatternId: string;

    anchor: ModalAnchor;

    onSelect: (
        patternId: string,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}

export const MeldChoiceModal = ({
    title,
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

                                <TileRow
                                    tiles={
                                        pattern.tiles
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