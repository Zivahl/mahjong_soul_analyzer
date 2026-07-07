import "./SettingCard.css";

interface SettingCardProps {
    title: string;
    children: React.ReactNode;
}

export const SettingCard = ({
    title,
    children,
}: SettingCardProps) => {
    return (
        <fieldset className="setting-card">
            <legend className="setting-card-title">
                {title}
            </legend>

            <div className="setting-card-content">
                {children}
            </div>
        </fieldset>
    );
};