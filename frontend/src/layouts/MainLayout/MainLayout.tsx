import type { PropsWithChildren } from "react";

import { Header } from "@/components/layout/Header/Header";

import "./MainLayout.css";

export const MainLayout = ({
    children,
}: PropsWithChildren) => {
    return (
        <div className="layout">
            <Header />

            <main className="layout-main">
                <section className="viewer-area">
                    T.B.D.
                </section>

                <section className="app-area">
                    {children}
                </section>
            </main>
        </div>
    );
};