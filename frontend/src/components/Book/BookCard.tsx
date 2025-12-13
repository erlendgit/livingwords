import { Link } from "react-router-dom";
import { type Book, useBook } from "../../plugins/api/books.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import { useState } from "react";
import { TextButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import { BookEditForm } from "./BookForm.tsx";

interface BookDisplayProps {
    withLink?: boolean;
    withSummary?: boolean;
}

interface BookCardProps {
    bookId: string;
    display?: BookDisplayProps;
}

interface BookCardViewProps {
    book: Book;
    display?: BookDisplayProps;
}

export function BookCard({ bookId, display }: BookCardProps) {
    const { data, isLoading, isError, error } = useBook(bookId);
    const book = data?.node;

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!book) return <p>Book not found</p>;

    return <BookCardView book={book} display={display} />;
}

export function BookCardView({ book, display }: BookCardViewProps) {
    const { withLink = true } = display || {};
    const { withSummary = false } = display || {};
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const handleShowEditDialog = () => setShowEditDialog(true);
    const handleCloseEditDialog = () => setShowEditDialog(false);

    return (
        <SpaceWidget>
            <strong>{book.title}</strong>
            {withSummary && book.summary && <p>{book.summary}</p>}
            {withLink && (
                <>
                    <TextButtonWidget component={Link} to={`/book/${book.id}`}>
                        Details
                    </TextButtonWidget>
                    <TextButtonWidget onClick={handleShowEditDialog}>
                        Edit
                    </TextButtonWidget>
                    {showEditDialog && (
                        <ModalDialogWidget
                            title={"Edit book"}
                            onCancel={handleCloseEditDialog}
                        >
                            <BookEditForm
                                book={book}
                                onClose={handleCloseEditDialog}
                            />
                        </ModalDialogWidget>
                    )}
                </>
            )}
        </SpaceWidget>
    );
}
