import { Box, type BoxProps } from "@mui/material";

function HeaderWidget(props: BoxProps) {
    return <Box component={"header"} {...props} />;
}

export default HeaderWidget;
