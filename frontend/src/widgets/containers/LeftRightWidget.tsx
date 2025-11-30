import {Box, type BoxProps} from "@mui/material";

function LeftRightWidget(props: BoxProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                "& > *": {flex: 1}
            }}
            {...props} />
    );
}

export default LeftRightWidget;