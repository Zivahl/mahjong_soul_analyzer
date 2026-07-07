import { NumberField } from "@/components/common/NumberField/NumberField";
import { SettingCard } from "@/components/common/SettingCard";
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

    const players = state.players.map((player) => ({
        ...player,
        wind: getPlayerWind(
            state.dealerSeat,
            player.seat,
        ),
    }));

    return (
        <SettingCard title="プレイヤー設定">
            <div className="player-section">
                {players.map((player) => (
                    <fieldset
                        key={player.id}
                        className="player-card"
                    >
                        <legend className="player-title">
                            <span className="player-wind">
                                {player.wind}
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
                ))}
            </div>
        </SettingCard>
    );
};