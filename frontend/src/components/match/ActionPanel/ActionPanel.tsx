import type {
    ActionType,
    PlayerActionState,
} from "@/types/analysis";

import "./ActionPanel.css";


interface Props {
    actions: PlayerActionState;

    onRequestAction: (
        action: ActionType,
    ) => void;
}


const ACTION_BUTTONS = [
    {
        type: "pon",
        label: "ポン",
    },
    {
        type: "chi",
        label: "チー",
    },
    {
        type: "kan",
        label: "カン",
    },
    {
        type: "ron",
        label: "ロン",
    },
] as const satisfies readonly {
    type: ActionType;
    label: string;
}[];


export const ActionPanel = ({
    actions,
    onRequestAction,
}: Props) => {
    return (
        <div className="action-panel">

            <div className="action-row">

                {ACTION_BUTTONS.map(
                    (button) => (
                        <button
                            key={button.type}
                            disabled={
                                !actions[
                                    button.type
                                ]
                            }
                            onClick={() =>
                                onRequestAction(
                                    button.type,
                                )
                            }
                        >
                            {button.label}
                        </button>
                    ),
                )}

            </div>

            <div className="action-row action-row-bottom">

                <button
                    disabled={!actions.tsumo}
                    onClick={() =>
                        onRequestAction(
                            "tsumo",
                        )
                    }
                >
                    ツモ
                </button>

            </div>

        </div>
    );
};