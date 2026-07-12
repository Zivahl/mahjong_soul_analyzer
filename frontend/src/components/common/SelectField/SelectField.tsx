import "./SelectField.css";

interface SelectOption<T extends string> {
    value: T;
    label: string;
}

interface Props<T extends string> {
    id?: string;

    value: T;

    options: readonly SelectOption<T>[];

    onChange: (value: T) => void;
}

export const SelectField = <T extends string>({
    id,
    value,
    options,
    onChange,
}: Props<T>) => {
    return (
        <select
            id={id}
            className="select-field"
            value={value}
            onChange={(event) =>
                onChange(event.target.value as T)
            }
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};