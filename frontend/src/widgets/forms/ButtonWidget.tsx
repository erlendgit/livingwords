import {Button, type ButtonProps} from "@mui/material";

export function ButtonWidget(props: ButtonProps) {
    return (
        <Button variant={"contained"} {...props} />
    );
}

export function SmallButtonWidget(props: ButtonProps) {
    return (
        <ButtonWidget size={"small"} {...props} />
    );
}