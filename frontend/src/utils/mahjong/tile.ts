import type { MatchSettings, MatchState } from "@/types/match";

import type { Tile, TileType } from "@/types/tile";

import {
    RED_TILE_TYPES,
    SANMA_EXCLUDED_TILE_TYPES,
    TILE_TYPES,
} from "@/constants/tiles";

export const normalizeTileType = (
    type: TileType,
): TileType => {

    for (const [normalType, redType] of Object.entries(RED_TILE_TYPES)) {
        if (redType === type) {
            return normalType as TileType;
        }
    }

    return type;
};

export const getRedTileType = (
    type: TileType,
): TileType | null => {

    return RED_TILE_TYPES[
        type as keyof typeof RED_TILE_TYPES
    ] ?? null;
};

const DEFAULT_MATCH_SETTINGS: MatchSettings = {
    redDora: true,
    sanma: false,
};

export const createAllTiles = (
    options: Partial<MatchSettings> = {},
): Tile[] => {

    const {
        redDora,
        sanma,
    } = {
        ...DEFAULT_MATCH_SETTINGS,
        ...options,
    };

    const excludedTileTypes = new Set<TileType>(
        sanma
            ? SANMA_EXCLUDED_TILE_TYPES
            : [],
    );

    const tileTypes = TILE_TYPES.filter(
        (tileType) =>
            tileType !== "?" &&
            tileType !== "5mr" &&
            tileType !== "5pr" &&
            tileType !== "5sr",
    );

    const tiles: Tile[] = [];
    let id = 0;

    for (const tileType of tileTypes) {

        if (excludedTileTypes.has(tileType)) {
            continue;
        }

        const redTileType = getRedTileType(tileType);

        if (redDora && redTileType) {

            for (let i = 0; i < 3; i++) {
                tiles.push({
                    id,
                    type: tileType,
                });

                id++;
            }

            tiles.push({
                id,
                type: redTileType,
            });

            id++;

            continue;
        }

        for (let i = 0; i < 4; i++) {
            tiles.push({
                id,
                type: tileType,
            });

            id++;
        }
    }

    return tiles;
};

export const createUnrevealedTiles = (
    allTiles: readonly Tile[],
    state: MatchState,
): Tile[] => {
    const revealedTileIds = new Set<number>();

    const addTile = (tile: Tile): void => {
        if (tile.id !== null) {
            revealedTileIds.add(tile.id);
        }
    };

    for (const player of state.players) {
        for (const tile of player.hand) {
            addTile(tile);
        }

        for (const discard of player.discards) {
            addTile(discard.tile);
        }

        for (const meld of player.melds) {
            for (const tile of meld.tiles) {
                addTile(tile);
            }
            if (meld.calledDiscard) {
                addTile(meld.calledDiscard.tile);
            }
        }
    }

    for (const tile of state.doraIndicators) {
        addTile(tile);
    }

    return allTiles.filter(
        (tile) =>
            tile.id !== null &&
            !revealedTileIds.has(tile.id),
    );
};