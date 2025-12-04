import {useEffect, useState} from "react";
import {type ContextPayload, type Context, useAddContext, useUpdateContext} from "../../plugins/api/contexts.tsx";
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
    const context: Context | undefined = data?.node

    function handleSave(context: ContextPayload) {
        addContext(context)
    }

    useEffect(() => {
        if (context && !isPending && !isError) {
            onSave(context.id)
        }
    }, [context, isPending, isError, onSave])

    return (
        <ContextForm onSave={handleSave} onClose={onClose}>
            {isPending && <p>Storing the context...</p>}
            {isError && <p>Context could not be stored.</p>}
        </ContextForm>
    )
}

interface ContextUpdateFormProps {
    context: Context,
    onClose: () => void,
}

export function ContextUpdateForm({context, onClose}: ContextUpdateFormProps) {
    const {mutate: updateContext, data, isPending, isError} = useUpdateContext(context.id);

    function handleSave(updatedContext: ContextPayload) {
        updateContext(updatedContext)
    }

    useEffect(() => {
        // TODO: Als er een fout optreedt sluit ie het scherm toch.
        if (data?.node && !isPending && !isError) {
            onClose();
        }
    }, [data, isPending, isError, onClose]);

    return (
        <ContextForm context={context} onSave={handleSave} onClose={onClose}>
            {isPending && <p>Updating the context...</p>}
            {isError && <p>Context could not be updated.</p>}
        </ContextForm>
    )
}

interface ContextFormProps {
    context?: Context
    onSave: (value: ContextPayload) => void,
    onClose: () => void,
    children?: React.ReactNode,
}

function ContextForm({context, onSave, onClose, children}: ContextFormProps) {
    const [description, setDescription] = useState<string>(context?.description || "");

    function handleSave() {
        onSave({
            description,
        })
        onClose()
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label={"Context description"}
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}/>
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    )
}
