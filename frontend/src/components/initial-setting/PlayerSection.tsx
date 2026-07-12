import { NumberField } from "@/components/common/NumberField/NumberField";
import { SettingCard } from "@/components/common/SettingCard/SettingCard";
import { TextField } from "@/components/common/TextField/TextField";
import { useMatchStore } from "@/store/matchStore";
import { getPlayerWind } from "@/utils/mahjong";

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
                                    {player.seat === "shimocha"
                                        ? "下家"
                                        : player.seat === "toimen"
                                          ? "対面"
                                          : player.seat === "kamicha"
                                            ? "上家"
                                            : "自家"}
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