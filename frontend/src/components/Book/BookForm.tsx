import {useEffect, useState} from "react";
import {type AddBookPayload, type Book, useAddBook, useEditBook} from "../../plugins/api/books.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextInputWidget, TextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";

interface BookFormProps {
    book?: Book,
    onSave: ({title, summary}: AddBookPayload) => void,
    onCancel: () => void,
    children: React.ReactNode
}

function BookForm({book, onSave, onCancel, children}: BookFormProps) {
    const [title, setTitle] = useState<string>(book?.title || "")
    const [summary, setSummary] = useState<string>(book?.summary || "")

    return (
        <FormWidget>
            <FieldsetWidget>
                <TextInputWidget
                    label={"Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                <MultilineTextInputWidget
                    label={"Summary"}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={4}/>
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={() => onSave({title, summary})}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={() => onCancel()}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    )
}


export function BookAddForm({onClose}: { onClose: () => void }) {
    const {mutate: addBook, data, isPending, isError} = useAddBook()

    useEffect(() => {
        if (data && !isPending && !isError) {
            onClose()
        }
    }, [onClose, data, isPending, isError]);

    return (
        <BookForm onSave={addBook}
                  onCancel={onClose}>
            {isPending && <p>Is storing book info...</p>}
            {isError && <p>An error occured! Try again later.</p>}
        </BookForm>)
}


export function BookEditForm({book, onClose}: {
    book: Book,
    onClose: () => void
}) {
    const {mutate: editBook, data, isPending, isError} = useEditBook(book.id)

    useEffect(() => {
        if (data && !isPending && !isError) {
            onClose()
        }
    }, [onClose, data, isPending, isError]);

    return (
        <BookForm book={book}
                  onSave={editBook}
                  onCancel={onClose}>
            {isPending && <p>Is updating book info...</p>}
            {isError && <p>An error occured! Try again later.</p>}
        </BookForm>)
}