import { ButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";

interface SubmitProps {
    onSubmit: () => void;
}

export function EditSubmit({ onSubmit }: SubmitProps) {
    return (
        <ButtonWidget style={{ flexGrow: 2 }} onClick={onSubmit}>
            Submit
        </ButtonWidget>
    );
}
