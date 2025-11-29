import React from "react";
import {Box} from "@mui/material";

function HeaderWidget({children}: { children: React.ReactNode }) {
    return (
        <Box component={"header"}>
            {children}
        </Box>
    )
}

export default HeaderWidget;