import {Box} from "@mui/material";

function FormWidget(props: unknown) {
    const {children, ...rest} : {children: React.ReactNode} & Record<string, unknown> = props as unknown;
    return (
        <Box component={"form"} {...rest}>
            {children}
        </Box>
    )
}

export default FormWidget;