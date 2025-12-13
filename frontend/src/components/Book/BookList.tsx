import { useBookList } from "../../plugins/api/books.tsx";
import { BookCardView } from "./BookCard.tsx";
import { useState } from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import { BookAddForm } from "./BookForm.tsx";
import { SmallButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";

export function BookList() {
    const { data, isLoading, isError, error } = useBookList();
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const startShowAddBookForm = () => setShowAddForm(true);
    const stopShowAddBookForm = () => setShowAddForm(false);

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <>
            <ul className={"list-page"}>
                {data!.nodes!.map((b) => (
                    <li key={b.id} className={"list-item"}>
                        <BookCardView book={b} />
                    </li>
                ))}
            </ul>
            {showAddForm && (
                <ModalDialogWidget
                    title={"Add a new book"}
                    onCancel={stopShowAddBookForm}
                >
                    <BookAddForm onClose={stopShowAddBookForm} />
                </ModalDialogWidget>
            )}
            {!showAddForm && (
                <SmallButtonWidget onClick={startShowAddBookForm}>
                    Add book
                </SmallButtonWidget>
            )}
        </>
    );
}
