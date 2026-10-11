import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { TileListEditor } from "@/components/common/TileListEditor/TileListEditor";
import { useMatchStore } from "@/store/matchStore";
import { useInitialRoundStore } from "@/store/initialRoundStore";
import { createUnrevealedTiles } from "@/utils/mahjong/tile";

export const DoraSection = () => {
    
    const {
        context,
    } = useMatchStore();

    const {
        state,
        setDoraIndicators,
    } = useInitialRoundStore();

    const allTiles =
        context.allTiles;

    const unrevealedTiles =
        createUnrevealedTiles(
            allTiles,
            state,
        );

    return (
        <SettingCard title="ドラ表示牌">
            <TileListEditor
                unrevealedTiles={unrevealedTiles}
                selectedTiles={state.doraIndicators}
                maxTiles={5}
                onChange={setDoraIndicators}
            />
        </SettingCard>
    );
};