import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { TileListEditor } from "@/components/common/TileListEditor/TileListEditor";
import { useMatchStore } from "@/store/matchStore";
import { useInitialRoundStore } from "@/store/initialRoundStore";
import { createUnrevealedTiles } from "@/utils/mahjong/tile";

export const HandSection = () => {
    const {
        context,
    } = useMatchStore();

    const {
        state,
        setHand,
    } = useInitialRoundStore();

    const self =
        state.players.find(
            (player) => player.seat === "self",
        )!;

    const allTiles =
        context.allTiles;

    const unrevealedTiles =
        createUnrevealedTiles(
            allTiles,
            state,
        );

    return (
        <SettingCard title="自家手牌">
            <TileListEditor
                unrevealedTiles={unrevealedTiles}
                selectedTiles={self.hand}
                maxTiles={14}
                onChange={(tiles) =>
                    setHand(self.id, tiles)
                }
            />
        </SettingCard>
    );
};