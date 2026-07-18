import { useMemo, useState } from "react";

import { MeldChoiceModal } from "@/components/modal/MeldChoiceModal/MeldChoiceModal";

import type { MeldChoicePattern } from "@/types/analysis";

interface Props {
    patterns: MeldChoicePattern[];

    onConfirm: (
        pattern: MeldChoicePattern,
    ) => void;

    onCancel: () => void;
}

export const PonModal = ({
    patterns,
    onConfirm,
    onCancel,
}: Props) => {
    const initialPatternId = useMemo(
        () => patterns[0]?.id ?? "",
        [patterns],
    );

    const [
        selectedPatternId,
        setSelectedPatternId,
    ] = useState(initialPatternId);

    const handleConfirm = () => {
        const pattern = patterns.find(
            (pattern) =>
                pattern.id ===
                selectedPatternId,
        );

        if (!pattern) {
            return;
        }

        onConfirm(pattern);
    };

    return (
        <MeldChoiceModal
            title="ポン設定"
            patterns={patterns}
            selectedPatternId={
                selectedPatternId
            }
            onSelect={
                setSelectedPatternId
            }
            onConfirm={handleConfirm}
            onCancel={onCancel}
        />
    );
};