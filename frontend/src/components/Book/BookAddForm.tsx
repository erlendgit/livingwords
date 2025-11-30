import {useEffect, useState} from "react";
import {useAddBook} from "../../plugins/api/books.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {TextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";

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
        <FormWidget>
            <FieldsetWidget>
                <TextInputWidget
                    label={"Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
            </FieldsetWidget>
            {isPending && <p>Is storing book info...</p>}
            {isError && <p>An error occured! Try again later.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={() => onSaveForm()}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={() => onCancel()}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    )
}