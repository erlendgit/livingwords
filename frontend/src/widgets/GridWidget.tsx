import {Grid} from "@mui/material";

export function GridContainerWidget({children}: { children: React.ReactNode }) {
    return (
        <Grid container>
            {children}
        </Grid>
    );
}

export function GridItemWidget({children, size}: { children: React.ReactNode, size?: number }) {
    return (
        <Grid size={size}>
            {children}
        </Grid>
    );
}