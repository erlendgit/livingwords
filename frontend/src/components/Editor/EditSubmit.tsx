import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";

interface SubmitProps {
    onSubmit: () => void;
}

export function EditSubmit({onSubmit}: SubmitProps) {
    return (
        <>
            <fieldset style={{position: "relative"}}>
                <SmallButtonWidget type="button"
                                   onClick={onSubmit}
                                   style={{position: "absolute", bottom: "1rem", right: "0", marginBottom: ".5rem"}}>
                    Submit
                </SmallButtonWidget>
            </fieldset>
        </>
    );
}