import { MeldChoiceModal } from "@/components/modal/MeldChoiceModal/MeldChoiceModal";

import type { MeldChoicePattern, ModalAnchor } from "@/types/analysis";

interface Props {
    patterns: MeldChoicePattern[];

    selectedPatternId: string;

    anchor: ModalAnchor;

    onSelect: (
        patternId: string,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}

export const PonModal = ({
    patterns,
    selectedPatternId,
    anchor,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {
    return (
        <MeldChoiceModal
            title="ポン牌設定"
            patterns={patterns}
            selectedPatternId={selectedPatternId}
            anchor={anchor}
            onSelect={onSelect}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};