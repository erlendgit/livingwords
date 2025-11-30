import {TextField, type TextFieldProps} from "@mui/material";

export function TextInputWidget(props: TextFieldProps) {
    return <TextField variant={"outlined"} {...props} />;
}

export function MultilineTextInputWidget(props: TextFieldProps) {
    return <TextInputWidget multiline {...props} />;
}
