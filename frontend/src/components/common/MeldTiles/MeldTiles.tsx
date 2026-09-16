import type { Seat, Meld } from "@/types/player";

import { getSidewaysIndex } from "@/utils/getSidewaysIndex";

import { Tile } from "../Tile/Tile";

import "./MeldTiles.css";

interface MeldTilesProps {
    caller: Seat;
    meld: Meld;
}

interface RenderTile {
    tile: Parameters<typeof Tile>[0]["tile"];
    sideways?: boolean;
    overlay?: boolean;
}

export const MeldTiles = ({
    caller,
    meld,
}: MeldTilesProps) => {

    /*
     * ポン / チー
     *
     * tiles:
     *   [自牌, 自牌]
     *
     * calledDiscard:
     *   相手の捨て牌
     */
    if (
        (
            meld.type === "pon" ||
            meld.type === "chi"
        ) &&
        meld.calledDiscard
    ) {

        if (
            meld.tiles.length !== 2
        ) {
            return null;
        }

        const sidewaysIndex =
            getSidewaysIndex(
                caller,
                meld.calledDiscard.seat,
            );

        const renderTiles: RenderTile[] = [];

        let ownTileIndex = 0;

        for (
            let index = 0;
            index < 3;
            index++
        ) {

            if (
                index === sidewaysIndex
            ) {

                renderTiles.push({
                    tile:
                        meld.calledDiscard.tile,

                    sideways:
                        true,
                });

                continue;
            }

            renderTiles.push({
                tile:
                    meld.tiles[ownTileIndex],
            });

            ownTileIndex++;
        }

        return (
            <div className="meld-tiles">
                {renderTiles.map((item, index) => (
                    <div
                        key={`${item.tile}-${index}`}
                        className="meld-tile"
                    >
                        <Tile
                            tile={item.tile}
                            sideways={item.sideways}
                            clickable={false}
                        />
                    </div>
                ))}
            </div>
        );
    }


    /*
     * 大明槓
     *
     * tiles:
     *   [自牌, 自牌, 自牌]
     *
     * calledDiscard:
     *   相手の捨て牌
     */
    if (
        meld.type === "kan" &&
        meld.kanType === "daiminkan"
    ) {

        const calledDiscard =
            meld.calledDiscard;

        if (
            !calledDiscard ||
            meld.tiles.length !== 3
        ) {
            return null;
        }

        const sidewaysIndex =
            getSidewaysIndex(
                caller,
                calledDiscard.seat,
            );

        const renderTiles: RenderTile[] = [];

        let ownTileIndex = 0;

        for (
            let index = 0;
            index < 4;
            index++
        ) {

            if (
                index === sidewaysIndex
            ) {

                renderTiles.push({
                    tile:
                        calledDiscard.tile,

                    sideways:
                        true,
                });

                continue;
            }

            renderTiles.push({
                tile:
                    meld.tiles[ownTileIndex],
            });

            ownTileIndex++;
        }

        return (
            <div className="meld-tiles">
                {renderTiles.map((item, index) => (
                    <div
                        key={`${item.tile}-${index}`}
                        className="meld-tile"
                    >
                        <Tile
                            tile={item.tile}
                            sideways={item.sideways}
                            clickable={false}
                        />
                    </div>
                ))}
            </div>
        );
    }


    /*
     * 加槓
     *
     * tiles:
     *   [元のpon自牌, 元のpon自牌, 加槓牌]
     *
     * calledDiscard:
     *   元のponで鳴いた牌
     *
     * 表示上は、鳴き牌の位置に加槓牌を重ねる。
     */
    if (
        meld.type === "kan" &&
        meld.kanType === "kakan"
    ) {

        const originalTiles =
            meld.tiles.slice(0, 2);

        const addedTile =
            meld.tiles[2];

        const calledDiscard =
            meld.calledDiscard;

        if (
            !calledDiscard ||
            originalTiles.length !== 2 ||
            !addedTile
        ) {
            return null;
        }

        const sidewaysIndex =
            getSidewaysIndex(
                caller,
                calledDiscard.seat,
            );

        const renderTiles: RenderTile[] = [];

        let originalIndex = 0;

        for (
            let index = 0;
            index < 3;
            index++
        ) {

            if (
                index === sidewaysIndex
            ) {

                renderTiles.push({
                    tile:
                        calledDiscard.tile,

                    sideways:
                        true,
                });

                continue;
            }

            renderTiles.push({
                tile:
                    originalTiles[
                        originalIndex
                    ],

            });

            originalIndex++;
        }

        return (
            <div className="meld-tiles">
                {renderTiles.map((item, index) => {

                    if (
                        index === sidewaysIndex
                    ) {
                        return (
                            <div
                                key={`${item.tile}-${index}`}
                                className="meld-tile meld-tile-kakan"
                            >
                                <div className="meld-tile-kakan-stack">
                                    <Tile
                                        tile={addedTile}
                                        sideways={true}
                                        clickable={false}
                                    />

                                    <Tile
                                        tile={item.tile}
                                        sideways={true}
                                        clickable={false}
                                    />
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={`${item.tile}-${index}`}
                            className="meld-tile"
                        >
                            <Tile
                                tile={item.tile}
                                sideways={item.sideways}
                                clickable={false}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }


    /*
     * 暗槓
     *
     * tiles:
     *   [自牌, 自牌, 自牌, 自牌]
     *
     * 表示:
     *   [裏, 表, 表, 裏]
     */
    if (
        meld.type === "kan" &&
        meld.kanType === "ankan"
    ) {

        const tiles: RenderTile[] = [
            {
                tile: "?",
            },
            {
                tile: meld.tiles[1],
            },
            {
                tile: meld.tiles[2],
            },
            {
                tile: "?",
            },
        ];

        return (
            <div className="meld-tiles">
                {tiles.map((item, index) => (
                    <Tile
                        key={`${item.tile}-${index}`}
                        tile={item.tile}
                        clickable={false}
                    />
                ))}
            </div>
        );
    }


    return null;
};