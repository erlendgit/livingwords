import {
    TextField,
    type TextFieldProps,
    type BaseTextFieldProps,
} from "@mui/material";

export function TextInputWidget(props: TextFieldProps) {
    return <TextField variant={"outlined"} {...props} />;
}

export function MultilineTextInputWidget(props: TextFieldProps) {
    return <TextInputWidget multiline {...props} />;
}

type IntegerInputWidgetProps = Omit<
    BaseTextFieldProps,
    "onChange" | "value" | "type"
> & {
    value: number;
    onChange: (newValue: number) => void;
};

export function IntegerInputWidget({
                                       value,
                                       onChange,
                                       ...props
                                   }: IntegerInputWidgetProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseInt(event.target.value, 10);
        onChange(Number.isNaN(parsed) ? 0 : parsed);
    };

    return (
        <TextField
            {...props}
            type="number"
            value={value}
            onChange={handleChange}
            slotProps={{
                htmlInput: {
                    step: 1,
                },
            }}
        />
    );
}