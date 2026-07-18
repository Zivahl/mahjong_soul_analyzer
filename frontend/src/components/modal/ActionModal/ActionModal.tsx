import type { ActionType } from "@/types/analysis";

import "./ActionModal.css";


interface Props {
    action: ActionType;

    onClose: () => void;
}


const ACTION_LABEL = {
    pon: "ポン設定",
    chi: "チー設定",
    kan: "カン設定",
    ron: "ロン確認",
    tsumo: "ツモ確認",
} as const;


export const ActionModal = ({
    action,
    onClose,
}: Props) => {
    return (
        <div className="action-modal-overlay">

            <div className="action-modal">

                <h2>
                    {ACTION_LABEL[action]}
                </h2>


                <div className="action-modal-content">
                    設定画面準備中
                </div>


                <button
                    onClick={onClose}
                >
                    閉じる
                </button>

            </div>

        </div>
    );
};