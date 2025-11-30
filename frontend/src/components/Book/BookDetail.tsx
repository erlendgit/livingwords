import {Link, useParams} from "react-router-dom"
import {type Book, useBook} from "../../plugins/api/books.tsx";
import {TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {useState} from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {BookEditForm} from "./BookForm.tsx";

export function BookDetail() {
    const {id} = useParams<{ id: string }>();
    const {data, isLoading, isError, error} = useBook(id!);
    const book: Book | undefined = data?.node
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const handleShowEditDialog = () => setShowEditDialog(true);
    const handleCloseEditDialog = () => setShowEditDialog(false);

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!book) return <p>Book not found</p>;

    return (
        <div>
            <h2>{book.title}</h2>
            {book.summary && <p>{book.summary}</p>}
            <TextButtonWidget onClick={handleShowEditDialog}> Edit </TextButtonWidget>
            <TextButtonWidget component={Link} to={`/book/${book.id}/edit`}> Write </TextButtonWidget>
            {showEditDialog && (
                <ModalDialogWidget title={"Update book details"} onCancel={handleCloseEditDialog}>
                    <BookEditForm book={book} onClose={handleCloseEditDialog}/>
                </ModalDialogWidget>
            )}
        </div>
    );
}