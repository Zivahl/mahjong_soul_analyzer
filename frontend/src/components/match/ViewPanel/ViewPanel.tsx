
import {
    useModelessStore,
} from "@/store/modelessStore";

import type {
    Seat,
} from "@/types/seat";

import "./ViewPanel.css";


interface Props {
    seat: Seat;
}


export const ViewPanel = ({
    seat,
}: Props) => {

    const openWindow =
        useModelessStore(
            (store) => store.openWindow,
        );


    return (
        <div className="view-panel">
            <button
                type="button"
                className="view-panel-button view-panel-river"
                onClick={() =>
                    openWindow({
                        type: "river",
                        seat,
                    })
                }
            >
                河
            </button>
            
            <button
                type="button"
                className="view-panel-button view-panel-meld"
                onClick={() =>
                    openWindow({
                        type: "meld",
                        seat,
                    })
                }
            >
                副露
            </button>
        </div>
    );
};