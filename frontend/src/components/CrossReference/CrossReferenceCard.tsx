import type { CrossReference } from "../../plugins/api/words.tsx";
import { type Book, useBook } from "../../plugins/api/books.tsx";

export interface CrossReferenceCardProps {
    reference: CrossReference;
}

export function CrossReferenceCard(props: CrossReferenceCardProps) {
    const { reference } = props;
    const { isLoading, data, error } = useBook(reference.book_id);
    const book: Book | undefined = data?.node;

    if (isLoading) return <p>Loading {reference.book_id}...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;
    if (!book) return <p>Book {reference.book_id} not found</p>;

    return <CrossReferenceCardView book={book} reference={reference} />;
}

export interface CrossReferenceCardViewProps {
    book: Book;
    reference: CrossReference;
}

export function CrossReferenceCardView(props: CrossReferenceCardViewProps) {
    const { book, reference } = props;
    return (
        <div>
            <strong>
                {book.title} {reference.chapter}:{reference.verse}
            </strong>
            {reference.content && (
                <p>
                    <i>{reference.content}</i>
                </p>
            )}
        </div>
    );
}
