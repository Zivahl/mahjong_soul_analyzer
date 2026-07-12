import { useMatchStore } from "@/store/matchStore";
import { getPlayerWind } from "@/utils/mahjong";
import { SEAT_LABEL } from "@/constants/seats";
import type { Seat } from "@/types/player";

import "./PlayerBlock.css";

interface Props {
    seat: Seat;
}

export const PlayerBlock = ({
    seat,
}: Props) => {
    const {
        state,
    } = useMatchStore();


    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );


    if (!player) {
        return null;
    }


    const wind = getPlayerWind(
        state.dealerSeat,
        player.seat,
    );


    const isDealer =
        player.seat === state.dealerSeat;


    return (
        <fieldset className="player-block">

            <legend className="player-block-title">

                <span className="player-seat">
                    {SEAT_LABEL[seat]}
                </span>

                <span
                    className={
                        isDealer
                            ? "player-wind dealer"
                            : "player-wind"
                    }
                >
                    {wind}
                </span>

                <span className="player-name">
                    {player.name || "プレイヤー名"}
                </span>

                <span className="player-score">
                    {player.score}
                </span>

            </legend>


            <div className="player-block-body">
                手牌
            </div>

        </fieldset>
    );
};