import { NumberField } from "@/components/common/NumberField/NumberField";
import { SettingCard } from "@/components/common/SettingCard";
import { TextField } from "@/components/common/TextField/TextField";
import { useMatchStore } from "@/store/matchStore";

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
                {state.players.map((player) => (
                    <fieldset
                        key={player.id}
                        className="player-card"
                    >
                        <legend className="player-title">
                            <span className="player-wind">
                                {player.wind}家
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