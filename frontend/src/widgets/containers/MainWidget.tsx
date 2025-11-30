import {Container, type ContainerProps} from "@mui/material";

function MainWidget(props: ContainerProps) {
    return (
        <Container component={"main"} {...props}/>
    )
}

export default MainWidget;