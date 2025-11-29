import {TextField} from "@mui/material";

export function TextFieldWidget(props: unknown) {
    return <TextField variant={"outlined"} {...props} />;
}

export function MultilineTextFieldWidget(props: unknown) {
    return <TextField variant={"outlined"} multiline {...props} />;
}
