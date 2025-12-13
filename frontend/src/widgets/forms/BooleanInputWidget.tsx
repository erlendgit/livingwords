import { FormControlLabel, Switch, type SwitchProps } from "@mui/material";

interface BooleanInputWidgetProps extends SwitchProps {
    label: string;
}

export function BooleanInputWidget({
    label,
    ...props
}: BooleanInputWidgetProps): React.ReactElement {
    return <FormControlLabel control={<Switch {...props} />} label={label} />;
}
