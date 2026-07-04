export type Wind = "東" | "南" | "西" | "北";

export interface MatchState {
    roundWind: Wind;
    roundNumber: 1 | 2 | 3 | 4;
    dealer: Wind;

    scores: {
        east: number;
        south: number;
        west: number;
        north: number;
    };

    doraIndicators: string[];

    riichiSticks: number;

    honba: number;

    hand: string[];
}
