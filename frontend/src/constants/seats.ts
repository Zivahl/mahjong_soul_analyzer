import type { Seat } from "@/types/player";

export const SEAT_LABEL = {
    self: "自家",
    shimocha: "下家",
    toimen: "対面",
    kamicha: "上家",
} as const satisfies Record<Seat, string>;

export const SEAT_OPTIONS = [
    {
        value: "self",
        label: SEAT_LABEL.self,
    },
    {
        value: "shimocha",
        label: SEAT_LABEL.shimocha,
    },
    {
        value: "toimen",
        label: SEAT_LABEL.toimen,
    },
    {
        value: "kamicha",
        label: SEAT_LABEL.kamicha,
    },
] as const satisfies readonly {
    value: Seat;
    label: string;
}[];