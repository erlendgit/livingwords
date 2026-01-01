import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectProps,
} from "@mui/material";
import { TextInputWidget } from "./TextInputWidget.tsx";
import { type ChangeEventHandler, useEffect } from "react";

export function SelectWidget(props: SelectProps) {
    const { labelId, ...rest } = props;
    if (labelId) {
        return (
            <FormControl fullWidth>
                <InputLabel id={labelId}>{rest.label}</InputLabel>
                <Select labelId={labelId} {...rest} />
            </FormControl>
        );
    }
    return <Select {...rest} />;
}

interface SelectWithFallbackWidgetProps {
    labelId: string;
    fallbackValue: string;
    onChangeFallback: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
}

export function SelectWithFallbackWidget(
    props: SelectWithFallbackWidgetProps & SelectProps,
) {
    const {
        children,
        value,
        label,
        labelId,
        fallbackValue,
        onChangeFallback,
        ...rest
    } = props;

    useEffect(() => {
        if (value !== "*" && fallbackValue !== "") {
            onChangeFallback({
                target: {
                    value: "",
                },
            } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
        }
    }, [value, fallbackValue, onChangeFallback]);

    return (
        <FormControl fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                value={value}
                label={label}
                {...rest}
                sx={{ mb: 1 }}
            >
                {children}
                <MenuItem value="*">Something else...</MenuItem>
            </Select>

            {value === "*" && (
                <TextInputWidget
                    value={fallbackValue}
                    onChange={onChangeFallback}
                    label={"Please specify"}
                />
            )}
        </FormControl>
    );
}
