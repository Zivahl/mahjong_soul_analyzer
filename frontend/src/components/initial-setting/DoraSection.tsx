import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { TilePicker } from "@/components/common/TilePicker/TilePicker";
import { useInitialSettingStore } from "@/store/initialSettingStore";

export const DoraSection = () => {
    const {
        state,
        setDoraIndicators,
    } = useInitialSettingStore();

    return (
        <SettingCard title="ドラ表示牌">
            <TilePicker
                source="all"
                selectionMode="single"
                selectedTile={state.doraIndicators[0]}
                onTileClick={() => {

                    if (!state.doraIndicators[0]) {
                        return;
                    }

                    setDoraIndicators(
                        state.doraIndicators,
                    )
                }}
            />
        </SettingCard>
    );
};