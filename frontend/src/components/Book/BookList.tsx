import {
    type Book,
    type BookCategory,
    useBooksByCategory,
} from "../../plugins/api/books.tsx";
import { BookCardView } from "./BookCard.tsx";
import { useState } from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import { BookAddForm } from "./BookForm.tsx";
import { SmallButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";

export function BookList() {
    const { data, isLoading, isError, error } = useBooksByCategory();
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const startShowAddBookForm = () => setShowAddForm(true);
    const stopShowAddBookForm = () => setShowAddForm(false);
    const nodes = data?.nodes || [];

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <>
            {!showAddForm && (
                <SmallButtonWidget onClick={startShowAddBookForm}>
                    Add book
                </SmallButtonWidget>
            )}
            {nodes &&
                nodes.map((bookCategory) => (
                    <BookCategoryView
                        bookCategory={bookCategory}
                        key={bookCategory.category}
                    />
                ))}
            {showAddForm && (
                <ModalDialogWidget
                    title={"Add a new book"}
                    onCancel={stopShowAddBookForm}
                >
                    <BookAddForm onClose={stopShowAddBookForm} />
                </ModalDialogWidget>
            )}
        </>
    );
}

const BookTableWidget = ItemTableWidget<Book>;

export function BookCategoryView({
    bookCategory,
}: {
    bookCategory: BookCategory;
}) {
    return (
        <>
            {bookCategory.category && <h3>{bookCategory.category}</h3>}
            <BookTableWidget
                items={bookCategory.books}
                columnCallbacks={[(book) => <BookCardView book={book} />]}
            />
        </>
    );
}
