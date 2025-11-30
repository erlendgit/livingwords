import {TextField, type TextFieldProps} from "@mui/material";

export function TextFieldWidget(props: TextFieldProps) {
    return <TextField variant={"outlined"} {...props} />;
}

export function MultilineTextFieldWidget(props: TextFieldProps) {
    return <TextFieldWidget multiline {...props} />;
}
