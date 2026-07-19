import { MeldChoiceModal } from "@/components/modal/MeldChoiceModal/MeldChoiceModal";

import type { MeldChoicePattern, ModalPlacement } from "@/types/analysis";

interface Props {
    patterns: MeldChoicePattern[];

    selectedPatternId: string;

    placement: ModalPlacement;

    onSelect: (
        patternId: string,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}

export const ChiModal = ({
    patterns,
    selectedPatternId,
    placement,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {
    return (
        <MeldChoiceModal
            title="チー牌設定"
            patterns={patterns}
            selectedPatternId={selectedPatternId}
            placement={placement}
            onSelect={onSelect}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};