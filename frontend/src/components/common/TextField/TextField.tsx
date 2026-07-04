import "./TextField.css";

interface TextFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const TextField = ({
    value,
    onChange,
    placeholder,
}: TextFieldProps) => {
    return (
        <input
            className="text-field"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
        />
    );
};