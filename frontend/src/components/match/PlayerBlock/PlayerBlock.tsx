import { useRef } from "react";

import { ActionPanel } from "@/components/match/ActionPanel/ActionPanel";

import { useMatchStore } from "@/store/matchStore";
import { useActionModalStore } from "@/store/actionModalStore";

import { getPlayerWind } from "@/utils/mahjong";

import { SEAT_LABEL } from "@/constants/seats";

import type { ActionType } from "@/types/analysis";
import type { Seat } from "@/types/player";

import "./PlayerBlock.css";

interface Props {
    seat: Seat;
}

export const PlayerBlock = ({
    seat,
}: Props) => {

    const blockRef =
        useRef<HTMLFieldSetElement>(null);


    const {
        state,
    } = useMatchStore();

    const open =
        useActionModalStore(
            (state) => state.open,
        );

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
        player.seat === state.dealerSeat;

    const handleRequestAction = (
        action: ActionType,
    ) => {
        const rect =
            blockRef.current
                ?.getBoundingClientRect();


        if (!rect) {
            return;
        }

        open({
            seat,

            action,

            placement: {
                x:
                    rect.left +
                    rect.width / 2,

                y:
                    rect.top +
                    rect.height / 2,
                width:
                    rect.width,
            },
        });
    };

    return (
        <fieldset
            ref={blockRef}
            className="player-block"
        >
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
                <ActionPanel
                    actions={
                        state.playerActions[seat]
                    }
                    onRequestAction={
                        handleRequestAction
                    }
                />
            </div>
        </fieldset>
    );
};