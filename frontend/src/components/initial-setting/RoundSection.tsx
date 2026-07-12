import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { SelectField } from "@/components/common/SelectField/SelectField";
import { useMatchStore } from "@/store/matchStore";
import type { Seat } from "@/types/player";

import "./RoundSection.css";

const DEALER_OPTIONS = [
    {
        value: "self",
        label: "自家",
    },
    {
        value: "shimocha",
        label: "下家",
    },
    {
        value: "toimen",
        label: "対面",
    },
    {
        value: "kamicha",
        label: "上家",
    },
] as const satisfies readonly {
    value: Seat;
    label: string;
}[];

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
                    options={DEALER_OPTIONS}
                    onChange={setDealerSeat}
                />
            </div>
        </SettingCard>
    );
};