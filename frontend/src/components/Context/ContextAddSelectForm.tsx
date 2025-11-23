import {useEffect, useState} from "react";
import {type Context, useAddContext} from "../../api/contexts.tsx";

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

    return <>
        <fieldset>
            <textarea placeholder={"Describe the context..."} value={description}
                      onChange={(e) => setDescription(e.target.value)}></textarea>
        </fieldset>
        {isPending && <p>Storing the context...</p>}
        {isError && <p>Context could not be stored.</p>}
        <div className={"grid"}>
            <button onClick={onSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </>
}
