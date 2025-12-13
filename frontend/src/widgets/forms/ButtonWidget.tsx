import { Button, type ButtonProps } from "@mui/material";

interface ButtonWidgetProps extends ButtonProps {
    to?: string;
}

export function ButtonWidget(props: ButtonWidgetProps) {
    return <Button variant={"contained"} {...props} />;
}

export function SmallButtonWidget(props: ButtonWidgetProps) {
    return <ButtonWidget size={"small"} {...props} />;
}

export function TextButtonWidget(props: ButtonWidgetProps) {
    return <SmallButtonWidget variant={"text"} {...props} />;
}

export function LinkButtonWidget(props: ButtonWidgetProps) {
    return <ButtonWidget variant={"outlined"} size={"small"} {...props} />;
}
