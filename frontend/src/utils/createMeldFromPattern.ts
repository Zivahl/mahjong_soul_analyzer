import type { MeldChoicePattern } from "@/types/analysis";
import type { Meld } from "@/types/player";


export const createMeldFromPattern = (
    type: Meld["type"],
    pattern: MeldChoicePattern,
): Meld => {

    return {

        type,

        tiles:
            pattern.tiles.map(
                (tile) =>
                    tile.tile,
            ),

        from:
            pattern.from,
    };
};