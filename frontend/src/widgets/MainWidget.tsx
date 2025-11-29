import React from "react";
import {Container} from "@mui/material";

function MainWidget({children}: {children: React.ReactNode}){
    return (
        <Container component={"main"}>
            {children}
        </Container>
    )
}

export default MainWidget;