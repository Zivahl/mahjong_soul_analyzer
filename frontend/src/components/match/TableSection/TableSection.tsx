import { CenterArea } from "@/components/match/CenterArea/CenterArea";
import { PlayerBlock } from "@/components/match/PlayerBlock/PlayerBlock";

import "./TableSection.css";

export const TableSection = () => {
    return (
        <fieldset className="table-section">
            <legend className="table-title">
                卓
            </legend>

            <div className="table-content">

                <div className="table-top">
                    <PlayerBlock seat="toimen" />
                </div>


                <div className="table-middle">
                    <PlayerBlock seat="kamicha" />

                    <CenterArea />

                    <PlayerBlock seat="shimocha" />
                </div>


                <div className="table-bottom">
                    <PlayerBlock seat="self" />
                </div>

            </div>
        </fieldset>
    );
};