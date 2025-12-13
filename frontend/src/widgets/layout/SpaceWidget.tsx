import { Box, type BoxProps } from "@mui/material";

function SpaceWidget(props: BoxProps) {
    return (
        <Box
            component={"section"}
            style={{ marginBottom: "1rem" }}
            {...props}
        />
    );
}

export default SpaceWidget;
