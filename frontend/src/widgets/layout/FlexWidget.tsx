import {Box} from "@mui/material";

export function FlexWidget({children}: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: ".5rem", "& > *": { flex: 1 } }}>
            {children}
        </Box>
    );
}
