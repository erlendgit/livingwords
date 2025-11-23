import {useBookList} from "../../api/books.tsx";
import {BookCardView} from "./BookCard.tsx";
import {useState} from "react";
import {ModalDialog} from "../../layouts/ModalDialog.tsx";
import {BookAddForm} from "./BookAddForm.tsx";

export function BookList() {
    const {data, isLoading, isError, error} = useBookList();
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const startShowAddBookForm = () => setShowAddForm(true)
    const stopShowAddBookForm = () => setShowAddForm(false)

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <>
            <ul className={"list-page"}>
                {data!.nodes!.map((b) => (
                    <li key={b.id} className={"list-item"}>
                        <BookCardView book={b}/>
                    </li>
                ))}
            </ul>
            {showAddForm && (
                <ModalDialog title={"Add a new book"} onCancel={stopShowAddBookForm}>
                    <BookAddForm onSave={stopShowAddBookForm} onCancel={stopShowAddBookForm}/>
                </ModalDialog>
            )}
            {!showAddForm && <button onClick={startShowAddBookForm}>Add book</button>}
        </>
    )
        ;
}