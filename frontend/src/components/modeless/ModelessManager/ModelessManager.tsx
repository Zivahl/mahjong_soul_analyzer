
import {
    useCallback,
    useLayoutEffect,
    useState,
} from "react";

import { RiverViewWindow } from "@/components/modeless/RiverViewWindow/RiverViewWindow";
import { useModelessStore } from "@/store/modelessStore";

import type { ModalAnchor } from "@/types/modal";
import type { Seat } from "@/types/seat";

interface WindowPosition {
    anchor: ModalAnchor;
}

const getElementAnchor = (
    element: Element | null,
): ModalAnchor | undefined => {
    if (!element) {
        return undefined;
    }

    const rect = element.getBoundingClientRect();

    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    };
};

const getWindowAnchor = (
    seat: Seat,
): ModalAnchor => {
    const playerBlock = document.querySelector(
        `.player-block[data-seat="${seat}"]`,
    );

    const playerAnchor =
        getElementAnchor(playerBlock);

    if (playerAnchor) {
        return playerAnchor;
    }

    const centerArea = document.querySelector(
        '[data-anchor="center-area"], .center-area',
    );

    const centerAnchor =
        getElementAnchor(centerArea);

    if (centerAnchor) {
        return centerAnchor;
    }

    return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };
};

export const ModelessManager = () => {
    const windows = useModelessStore(
        (store) => store.windows,
    );

    const [positions, setPositions] = useState<
        Record<number, WindowPosition>
    >({});

    const updatePositions = useCallback(() => {
        const nextPositions: Record<
            number,
            WindowPosition
        > = {};

        for (const modelessWindow of windows) {
            if (modelessWindow.type === "river") {
                nextPositions[modelessWindow.id] = {
                    anchor: getWindowAnchor(
                        modelessWindow.seat,
                    ),
                };
            }
        }

        setPositions(nextPositions);
    }, [windows]);

    useLayoutEffect(() => {
        updatePositions();

        window.addEventListener(
            "resize",
            updatePositions,
        );
        window.addEventListener(
            "scroll",
            updatePositions,
            true,
        );

        return () => {
            window.removeEventListener(
                "resize",
                updatePositions,
            );
            window.removeEventListener(
                "scroll",
                updatePositions,
                true,
            );
        };
    }, [updatePositions]);

    return (
        <>
            {windows.map((modelessWindow) => {
                const position =
                    positions[modelessWindow.id];

                if (!position) {
                    return null;
                }

                switch (modelessWindow.type) {
                    case "river":
                        return (
                            <RiverViewWindow
                                key={modelessWindow.id}
                                id={modelessWindow.id}
                                seat={modelessWindow.seat}
                                anchor={position.anchor}
                            />
                        );

                    case "meld":
                        return null;
                }
            })}
        </>
    );
};