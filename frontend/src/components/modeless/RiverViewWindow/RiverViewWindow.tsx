
import { TileImage } from "@/components/common/TileImage/TileImage";
import { useModelessStore } from "@/store/modelessStore";
import { useMatchStore } from "@/store/matchStore";
import { SEAT_LABEL } from "@/constants/seats";

import type { Seat } from "@/types/seat";
import type { ModalAnchor } from "@/types/modal";

import "./RiverViewWindow.css";

interface RiverViewWindowProps {
    id: number;
    seat: Seat;
    anchor: ModalAnchor;
}

export const RiverViewWindow = ({
    id,
    seat,
    anchor,
}: RiverViewWindowProps) => {
    const player = useMatchStore((store) =>
        store.state.players.find(
            (player) => player.seat === seat,
        ),
    );

    const closeWindow = useModelessStore(
        (store) => store.closeWindow,
    );

    if (!player) {
        return null;
    }

    return (
        <section
            className="river-view-window"
            style={{
                left: anchor.x,
                top: anchor.y,
            }}
            aria-label={`河 <${SEAT_LABEL[seat]}>`}
        >
            <header className="river-view-header">
                <span>{`河 <${SEAT_LABEL[seat]}>`}</span>

                <button
                    type="button"
                    className="river-view-close"
                    onClick={() => closeWindow(id)}
                    aria-label="河表示を閉じる"
                >
                    ×
                </button>
            </header>

            <div className="river-view-tiles">
                {player.discards.map((discard, index) => (
                    <div
                        key={`${discard.tile.id}-${index}`}
                        className={[
                            "river-view-discard",
                            discard.type,
                            discard.riichi && "riichi",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        title={
                            discard.type === "tedashi"
                                ? "手出し"
                                : "ツモ切り"
                        }
                    >
                        <TileImage
                            tile={discard.tile}
                            clickable={false}
                            riichi={discard.riichi}
                        />

                        <span className="river-view-discard-type">
                            {discard.type === "tedashi"
                                ? "手"
                                : "ツモ"}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};