import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { TileListEditor } from "@/components/common/TileListEditor/TileListEditor";
import { useInitialSettingStore } from "@/store/initialSettingStore";

export const DoraSection = () => {
    const {
        state,
        setDoraIndicators,
    } = useInitialSettingStore();

    return (
        <SettingCard title="ドラ表示牌">
            <TileListEditor
                tiles={state.doraIndicators}
                maxTiles={5}
                onChange={setDoraIndicators}
            />
        </SettingCard>
    );
};