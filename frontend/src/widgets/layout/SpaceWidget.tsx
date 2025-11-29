import {Box} from "@mui/material";

function SpaceWidget({children}: {children: React.ReactNode}) {
    return (
        <Box component={"section"} style={{ marginBottom: '1rem' }}>
            {children}
        </Box>
    );
}

export default SpaceWidget;