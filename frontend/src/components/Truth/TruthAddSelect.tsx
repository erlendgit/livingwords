import {useEffect, useState} from "react";
import {type TruthPayload, type Truth, useAddTruth, useUpdateTruth} from "../../plugins/api/truths.tsx";
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
    const truth = data?.node;

    function handleSave(value: TruthPayload) {
        addTruth(value);
    }

    useEffect(() => {
        if (truth && !isPending && !isError) {
            onSave(truth.id);
        }
    }, [onSave, data, isPending, isError]);

    return (
        <TruthForm onSave={handleSave} onCancel={onCancel}>
            {isPending && <p>Storing the truth...</p>}
            {isError && <p>Truth could not be stored.</p>}
        </TruthForm>
    )
}

interface TruthUpdateFormProps {
    truth: Truth;
    onClose: () => void;
}

export function TruthUpdateForm({truth, onClose}: TruthUpdateFormProps) {
    const {mutate: updateTruth, data, isPending, isError} = useUpdateTruth(truth.id);

    function handleSave(value: TruthPayload) {
        updateTruth(value);
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onClose();
        }
    }, [data, isPending, isError, onClose]);

    return (
        <TruthForm truth={truth} onSave={handleSave} onCancel={onClose}>
            {isPending && <p>Updating the truth...</p>}
            {isError && <p>Truth could not be updated.</p>}
        </TruthForm>
    )
}

interface TruthFormProps {
    truth?: Truth;
    onSave: (value: TruthPayload) => void;
    onCancel: () => void;
    children?: React.ReactNode;
}

function TruthForm({truth, onSave, onCancel, children}: TruthFormProps) {
    const [statement, setStatement] = useState<string>(truth?.statement || "");

    function handleSave() {
        onSave({statement});
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label="Truth statement"
                    rows={3}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}/>
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}