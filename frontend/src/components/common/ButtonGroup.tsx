import "./ButtonGroup.css";

interface ButtonGroupProps<T extends string | number> {
    label: string;
    options: readonly T[];
    value: T;
    onChange: (value: T) => void;
}

export const ButtonGroup = <T extends string | number>({
    label,
    options,
    value,
    onChange,
}: ButtonGroupProps<T>) => {
    return (
        <div className="button-group">

            <div className="button-group-label">
                {label}
            </div>

            <div className="button-group-buttons">

                {options.map((option) => (
                    <button
                        key={option}
                        className={
                            option === value
                                ? "button-group-button selected"
                                : "button-group-button"
                        }
                        onClick={() => onChange(option)}
                    >
                        {option}
                    </button>
                ))}

            </div>

        </div>
    );
};
