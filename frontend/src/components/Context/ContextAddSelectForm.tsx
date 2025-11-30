import {useEffect, useState} from "react";
import {type Context, useAddContext} from "../../plugins/api/contexts.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";

interface ContextAddFormProps {
    onSave: (value: string) => void,
    onClose: () => void,
}

export function ContextAddSelectForm({onSave, onClose}: ContextAddFormProps) {
    const {mutate: addContext, data, isPending, isError} = useAddContext()
    const [description, setDescription] = useState<string>("");
    const context: Context | undefined = data?.node

    function handleSave() {
        addContext({description})
    }

    useEffect(() => {
        if (context && !isPending && !isError) {
            onSave(context.id)
        }
    }, [context, isPending, isError])

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label={"Context description"}
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}/>
            </FieldsetWidget>
            {isPending && <p>Storing the context...</p>}
            {isError && <p>Context could not be stored.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    )
}
