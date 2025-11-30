import {Link} from "react-router-dom";
import {type Book, useBook} from "../../plugins/api/books.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";

interface BookDisplayProps {
    withLink?: boolean
}

interface BookCardProps {
    bookId: string,
    display?: BookDisplayProps,
}

interface BookCardViewProps {
    book: Book,
    display?: BookDisplayProps,
}

export function BookCard({bookId, display}: BookCardProps) {
    const {data, isLoading, isError, error} = useBook(bookId);
    const book = data?.node

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!book) return <p>Book not found</p>;

    return <BookCardView book={book} display={display}/>
}

export function BookCardView({book, display}: BookCardViewProps) {
    const {withLink = true} = display || {};

    return (
        <SpaceWidget>
            <strong>{book.title}</strong>
            {withLink && (
                <Link to={`/book/${book.id}`} role={"button"} className="primary">
                    View details
                </Link>
            )}
        </SpaceWidget>
    );
}