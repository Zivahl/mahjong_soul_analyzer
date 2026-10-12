import type { Seat } from "@/types/seat";

export type ModelessWindowType =
    | "river"
    | "meld";

export type ModelessWindow =
    | {
          id: number;
          type: "river";
          seat: Seat;
      }
    | {
          id: number;
          type: "meld";
          seat: Seat;
      };

export type ModelessWindowInput =
    | {
          type: "river";
          seat: Seat;
      }
    | {
          type: "meld";
          seat: Seat;
      };