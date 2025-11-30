import {Box, type BoxProps} from "@mui/material";

export function FlexWidget(props: BoxProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: ".5rem",
                "& > *": {flex: 1}
            }}
            {...props} />
    );
}
