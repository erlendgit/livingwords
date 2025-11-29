import {useEffect, useState} from "react";
import {useAddBook} from "../../plugins/api/books.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

interface BookAddFormProps {
    onSave: () => void,
    onCancel: () => void,
}

export function BookAddForm({onSave, onCancel}: BookAddFormProps) {
    const {mutate: addBook, data, isPending, isError} = useAddBook()
    const [title, setTitle] = useState<string>("")

    function onSaveForm() {
        addBook({title})
    }

    useEffect(() => {
        if (data && !isPending && !isError) {
            onSave()
        }
    }, [data, isPending, isError]);

    return (
        <>
            <fieldset>
                <input type={"text"}
                       placeholder={"Book title..."}
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
            </fieldset>
            {isPending && <p>Is storing book info...</p>}
            {isError && <p>An error occured! Try again later.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={() => onSaveForm()}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={() => onCancel()}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    )
}