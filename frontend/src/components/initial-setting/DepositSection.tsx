import { NumberField } from "@/components/common/NumberField/NumberField";
import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { useMatchStore } from "@/store/matchStore";

import "./DepositSection.css";

export const DepositSection = () => {
    const {
        state,
        setRiichiSticks,
        setHonba,
    } = useMatchStore();

    return (
        <SettingCard title="供託">
            <div className="deposit-section">
                <label>リーチ棒</label>

                <NumberField
                    value={state.riichiSticks}
                    onChange={setRiichiSticks}
                />

                <label>本場</label>

                <NumberField
                    value={state.honba}
                    onChange={setHonba}
                />
            </div>
        </SettingCard>
    );
};