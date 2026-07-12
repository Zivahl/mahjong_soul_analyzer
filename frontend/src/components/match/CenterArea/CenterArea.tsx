import { useMatchStore } from "@/store/matchStore";

import "./CenterArea.css";


export const CenterArea = () => {
    const {
        state,
    } = useMatchStore();


    return (
        <div className="center-area">

            <div className="center-round">
                {state.roundWind}
                {state.roundNumber}
                局
            </div>


            <div className="center-divider" />


            <div className="center-remaining">
                余 {String(state.remainingTiles).padStart(2, "0")}
            </div>

        </div>
    );
};