import type { ReactNode } from "react";
import "./SettingCard.css";

interface SettingCardProps {
    title: string;
    children: ReactNode;
}

export const SettingCard = ({
    title,
    children,
}: SettingCardProps) => {
    return (
        <section className="setting-card">
            <h3 className="setting-card-title">
                {title}
            </h3>

            <div className="setting-card-body">
                {children}
            </div>
        </section>
    );
};
