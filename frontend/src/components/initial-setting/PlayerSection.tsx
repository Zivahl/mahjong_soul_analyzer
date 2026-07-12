import { NumberField } from "@/components/common/NumberField/NumberField";
import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { TextField } from "@/components/common/TextField/TextField";
import { useMatchStore } from "@/store/matchStore";
import { getPlayerWind } from "@/utils/mahjong";
import { SEAT_LABEL } from "@/constants/seats";

import "./PlayerSection.css";

export const PlayerSection = () => {
    const {
        state,
        setPlayerName,
        setPlayerScore,
    } = useMatchStore();

    return (
        <SettingCard title="プレイヤー設定">
            <div className="player-section">
                {state.players.map((player) => {
                    const wind = getPlayerWind(
                        state.dealerSeat,
                        player.seat,
                    );

                    const isDealer =
                        player.seat === state.dealerSeat;

                    return (
                        <fieldset
                            key={player.id}
                            className="player-card"
                        >
                            <legend className="player-title">
                                <span className="player-seat">
                                    {SEAT_LABEL[player.seat]}
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

                                <label>名前</label>

                                <TextField
                                    value={player.name}
                                    placeholder="プレイヤー名"
                                    onChange={(value) =>
                                        setPlayerName(
                                            player.id,
                                            value,
                                        )
                                    }
                                />

                                <label>点数</label>

                                <NumberField
                                    value={player.score}
                                    onChange={(value) =>
                                        setPlayerScore(
                                            player.id,
                                            value,
                                        )
                                    }
                                />
                            </legend>
                        </fieldset>
                    );
                })}
            </div>
        </SettingCard>
    );
};