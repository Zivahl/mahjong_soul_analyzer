import { ButtonGroup } from "../common/ButtonGroup";
import { SettingCard } from "../common/SettingCard";
import { useMatchStore } from "../../store/matchStore";

const winds = ["東", "南", "西", "北"] as const;
const rounds = [1, 2, 3, 4] as const;

export const RoundSection = () => {
    const {
        state,
        setRoundWind,
        setRoundNumber,
        setDealer,
    } = useMatchStore();

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
                value={state.dealer}
                onChange={setDealer}
            />

        </SettingCard>
    );
};
