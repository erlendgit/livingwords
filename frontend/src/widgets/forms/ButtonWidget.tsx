import {Button} from "@mui/material";

export function ButtonWidget({children, ...props}: { children: React.ReactNode; props?: unknown }) {
    const {variant = "contained", ...rest} = props as { variant?: string } & Record<string, unknown>;

    return (
        <Button variant={variant} {...rest}>
            {children}
        </Button>
    );
}

export function SmallButtonWidget({children, ...props}: { children: React.ReactNode; props?: unknown }) {
    return (
        <ButtonWidget size={"small"} {...props}>
            {children}
        </ButtonWidget>
    );
}