import {useEffect, useState} from "react";
import {useAddAgency} from "../../plugins/api/agencies.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextFieldWidget} from "../../widgets/forms/TextFieldWidget.tsx";

interface AgencyCreateSelectProps {
    role: string;
    onSelect: (value: string) => void;
    onCancel: () => void;
}

export function AgencyCreateSelect({role, onSelect, onCancel}: AgencyCreateSelectProps) {
    const [description, setDescription] = useState<string>("");
    const {mutate: addAgency, data, isPending, isError} = useAddAgency()

    function handleSave() {
        addAgency({role, description})
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onSelect(data.node.id);
            onCancel();
        }
    }, [data, isPending, isError, onSelect, onCancel]);

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextFieldWidget
                    label={"Description"}
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}/>
            </FieldsetWidget>
            {isPending && <p>Is storing...</p>}
            {isError && <p>An error occured! Try again later.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}