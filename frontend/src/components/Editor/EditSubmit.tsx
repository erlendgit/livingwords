import {ButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";

interface SubmitProps {
    onSubmit: () => void;
}

export function EditSubmit({onSubmit}: SubmitProps) {
    return (
        <FieldsetWidget>
            <ButtonWidget onClick={onSubmit}>
                Submit
            </ButtonWidget>
        </FieldsetWidget>
    );
}