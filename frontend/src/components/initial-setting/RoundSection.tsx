import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { SelectField } from "@/components/common/SelectField/SelectField";
import { useMatchStore } from "@/store/matchStore";
import { SEAT_OPTIONS } from "@/constants/seats";

import "./RoundSection.css";

export const RoundSection = () => {
    const {
        state,
        setDealerSeat,
    } = useMatchStore();

    return (
        <SettingCard title="局情報">
            <div className="round-row">
                <span className="round-display">
                    {state.roundWind}
                    {state.roundNumber}
                    局
                </span>

                <label htmlFor="dealer-seat">
                    起家
                </label>

                <SelectField 
                    id="dealer-seat"
                    value={state.dealerSeat}
                    options={SEAT_OPTIONS}
                    onChange={setDealerSeat}
                />
            </div>
        </SettingCard>
    );
};