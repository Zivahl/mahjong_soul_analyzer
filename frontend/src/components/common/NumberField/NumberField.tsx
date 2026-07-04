import "./NumberField.css";

interface NumberFieldProps {
    value: number;
    onChange: (value: number) => void;
}

export const NumberField = ({
    value,
    onChange,
}: NumberFieldProps) => {
    return (
        <input
            className="number-field"
            type="number"
            value={value}
            onChange={(event) =>
                onChange(Number(event.target.value))
            }
        />
    );
};