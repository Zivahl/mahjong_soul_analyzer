import { SettingCard } from "@/components/common/SettingCard";
import { TileListEditor } from "@/components/common/TileListEditor/TileListEditor";

import { useMatchStore } from "@/store/matchStore";

export const DoraSection = () => {
    const {
        state,
        setDoraIndicators,
    } = useMatchStore();

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