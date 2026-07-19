import { MeldChoiceModal } from "@/components/modal/MeldChoiceModal/MeldChoiceModal";

import type { MeldChoicePattern } from "@/types/analysis";

interface Props {
    patterns: MeldChoicePattern[];

    selectedPatternId: string;

    onSelect: (
        patternId: string,
    ) => void;

    onConfirm: () => void;

    onCancel: () => void;
}

export const ChiModal = ({
    patterns,
    selectedPatternId,
    onSelect,
    onConfirm,
    onCancel,
}: Props) => {
    return (
        <MeldChoiceModal
            title="チー設定"
            patterns={patterns}
            selectedPatternId={selectedPatternId}
            onSelect={onSelect}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};