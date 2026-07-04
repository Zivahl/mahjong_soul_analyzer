import { ButtonGroup } from "@/components/common/ButtonGroup";
import { SettingCard } from "@/components/common/SettingCard";
import { useMatchStore } from "@/store/matchStore";

const winds = ["東", "南", "西", "北"] as const;

const rounds = [1, 2, 3, 4] as const;

export const RoundSection = () => {
    const {
        state,
        setRoundWind,
        setRoundNumber,
        setDealer,
    } = useMatchStore();

    const dealer =
        state.players.find((player) => player.isDealer)?.wind ?? "東";

    return (
        <SettingCard title="局情報">
            <ButtonGroup
                label="場風"
                options={winds}
                value={state.roundWind}
                onChange={setRoundWind}
            />

            <ButtonGroup
                label="局"
                options={rounds}
                value={state.roundNumber}
                onChange={setRoundNumber}
            />

            <ButtonGroup
                label="親"
                options={winds}
                value={dealer}
                onChange={setDealer}
            />
        </SettingCard>
    );
};
