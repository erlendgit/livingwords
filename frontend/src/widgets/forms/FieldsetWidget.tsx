import { FormGroup, type FormGroupProps } from "@mui/material";

function FieldsetWidget(props: FormGroupProps) {
    return (
        <FormGroup
            sx={{
                margin: ".5rem 0 1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                gap: "1rem",
            }}
            {...props}
        />
    );
}

export default FieldsetWidget;
