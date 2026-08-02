import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { TileListEditor } from "@/components/common/TileListEditor/TileListEditor";
import { useInitialSettingStore } from "@/store/initialSettingStore";

export const HandSection = () => {
    const {
        state,
        setHand,
    } = useInitialSettingStore();

    const self =
        state.players.find(
            (player) => player.seat === "self",
        )!;

    return (
        <SettingCard title="自家手牌">
            <TileListEditor
                tiles={self.hand}
                maxTiles={14}
                onChange={(tiles) =>
                    setHand(self.id, tiles)
                }
            />
        </SettingCard>
    );
};