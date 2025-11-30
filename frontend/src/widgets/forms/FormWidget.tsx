import {Box, type BoxProps} from "@mui/material";

function FormWidget(props: BoxProps) {
    return (
        <Box component={"form"} {...props}/>
    )
}

export default FormWidget;