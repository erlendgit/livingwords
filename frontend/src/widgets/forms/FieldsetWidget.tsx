import {FormGroup} from "@mui/material";

function FieldsetWidget({children}: { children: React.ReactNode }) {
    return (
        <FormGroup
            component={"fieldset"}
            sx={{
                margin: '.5rem 0 1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                gap: '1rem',
            }}>
            {children}
        </FormGroup>
    );
}

export default FieldsetWidget;