import { SettingCard } from "@/components/common/SettingCard";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";

import { useMatchStore } from "@/store/matchStore";

export const DoraSection = () => {
    const {
        state,
        setDoraIndicators,
    } = useMatchStore();

    return (
        <SettingCard title="ドラ表示牌">
            <TilePicker
                selectedTiles={state.doraIndicators}
                onTileClick={(tile) =>
                    setDoraIndicators([tile])
                }
            />
        </SettingCard>
    );
};