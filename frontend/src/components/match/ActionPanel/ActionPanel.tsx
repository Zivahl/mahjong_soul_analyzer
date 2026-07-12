import type { PlayerActionState } from "@/types/analysis";

import "./ActionPanel.css";


interface Props {
    actions: PlayerActionState;
}


export const ActionPanel = ({
    actions,
}: Props) => {
    return (
        <div className="action-panel">

            <div className="action-row">

                <button
                    disabled={!actions.pon}
                >
                    ポン
                </button>


                <button
                    disabled={!actions.chi}
                >
                    チー
                </button>


                <button
                    disabled={!actions.kan}
                >
                    カン
                </button>


                <button
                    disabled={!actions.ron}
                >
                    ロン
                </button>

            </div>


            <div className="action-row action-row-bottom">

                <button
                    disabled={!actions.tsumo}
                >
                    ツモ
                </button>

            </div>

        </div>
    );
};