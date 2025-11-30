import {useEffect, useState} from "react";
import {useAddTruth} from "../../plugins/api/truths.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";

interface TruthAddSelectProps {
    onSave: (value: string) => void;
    onCancel: () => void;
}

export function TruthAddSelect({onSave, onCancel}: TruthAddSelectProps) {
    const {mutate: addTruth, data, isPending, isError} = useAddTruth();
    const [statement, setStatement] = useState<string>("");
    const truth = data?.node;

    function handleSave() {
        addTruth({statement});
    }

    useEffect(() => {
        if (truth && !isPending && !isError) {
            onSave(truth.id);
        }
    }, [onSave, data, isPending, isError]);

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label="Truth statement"
                    rows={3}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}/>
            </FieldsetWidget>
            {isPending && <p>Storing the truth...</p>}
            {isError && <p>Truth could not be stored.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Add new truth</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}