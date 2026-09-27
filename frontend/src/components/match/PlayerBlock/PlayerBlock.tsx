import { ActionPanel } from "@/components/match/ActionPanel/ActionPanel";

import { useMatchStore } from "@/store/matchStore";

import { getPlayerWind } from "@/utils/mahjong/seat";

import { SEAT_LABEL } from "@/constants/seats";

import type {
    ActionType,
    PlayerActionRequest,
} from "@/types/action";

import type { Seat } from "@/types/seat";

import "./PlayerBlock.css";

interface Props {
    seat: Seat;
}

export const PlayerBlock = ({
    seat,
}: Props) => {

    const {
        state,
        requestAction,
    } = useMatchStore();

    const player =
        state.players.find(
            (player) =>
                player.seat === seat,
        );

    if (!player) {
        return null;
    }

    const wind =
        getPlayerWind(
            state.dealerSeat,
            player.seat,
        );

    const isDealer =
        player.seat ===
        state.dealerSeat;

    const actions =
        state.playerActions[seat];

    const handleRequestAction = (
        action: ActionType,
    ) => {

        let request:
            PlayerActionRequest;

        switch (action) {

            case "pon":
                request = {
                    action: "pon",
                    seat,
                };
                break;

            case "chi":
                request = {
                    action: "chi",
                    seat,
                };
                break;

            case "kan":
                request = {
                    action: "kan",
                    seat,
                };
                break;

            case "tsumohora":
                request = {
                    action: "tsumohora",
                    seat,
                };
                break;

            case "ronhora":
                request = {
                    action: "ronhora",
                    seat,
                };
                break;

            case "tsumo":
            case "discard":
            case "dora":
                return;
        }

        requestAction(request);
    };

    return (
        <fieldset
            className="player-block"
            data-seat={seat}
        >
            <legend
                className="player-block-title"
            >
                <span
                    className="player-seat"
                >
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

                <span
                    className="player-name"
                >
                    {
                        player.name ||
                        "プレイヤー名"
                    }
                </span>

                <span
                    className="player-score"
                >
                    {player.score}
                </span>
            </legend>

            <div
                className="player-block-body"
            >
                <ActionPanel
                    actions={actions}
                    onRequestAction={
                        handleRequestAction
                    }
                />
            </div>
        </fieldset>
    );
};