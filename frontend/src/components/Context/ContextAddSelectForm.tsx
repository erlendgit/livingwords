import {useEffect, useState} from "react";
import {type Context, useAddContext} from "../../plugins/api/contexts.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextFieldWidget} from "../../widgets/forms/TextFieldWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";

interface ContextAddFormProps {
    selectContext: (value: string) => void,
    onClose: () => void,
}

export function ContextAddSelectForm({selectContext, onClose}: ContextAddFormProps) {
    const {mutate: addContext, data, isPending, isError} = useAddContext()
    const [description, setDescription] = useState<string>("");
    const context: Context | undefined = data?.node

    function onSave() {
        addContext({description})
    }

    useEffect(() => {
        if (context && !isPending && !isError) {
            selectContext(context.id)
        }
    }, [context, isPending, isError])

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextFieldWidget
                    label={"Context description"}
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}/>
            </FieldsetWidget>
            {isPending && <p>Storing the context...</p>}
            {isError && <p>Context could not be stored.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    )
}
