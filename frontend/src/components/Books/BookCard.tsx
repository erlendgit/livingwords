import type {Book} from "../../api/types";
import {Link} from "react-router-dom";

export function BookCard({book}: { book: Book }) {
    return (
        <>
            <strong>{book.title}</strong>
            <Link to={`/book/${book.id}`}>
                View details
            </Link>
        </>
    );
}