import type {
    ActionType,
    PlayerActionState,
} from "@/types/action";

import "./ActionPanel.css";

interface Props {
    actions: PlayerActionState;
    onRequestAction: (
        action: ActionType,
    ) => void;
}

// 上段：鳴きアクション（ポン・チー・カン）
const TOP_ACTION_BUTTONS = [
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
] as const satisfies readonly {
    type: ActionType;
    label: string;
}[];

// 下段：和了アクション（ツモ・ロン）
const BOTTOM_ACTION_BUTTONS = [
    {
        type: "tsumohora",
        label: "ツモ",
    },
    {
        type: "ronhora",
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
            {/* 上段：ポン / チー / カン */}
            <div className="action-row">
                {TOP_ACTION_BUTTONS.map(
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

            {/* 下段：ツモ / ロン */}
            <div className="action-row action-row-bottom">
                {BOTTOM_ACTION_BUTTONS.map(
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
        </div>
    );
};