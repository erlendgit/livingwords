import {useBookList} from "../../api/books.tsx";
import {BookCard} from "./BookCard.tsx";

export function BookList() {
    const {data, isLoading, isError, error} = useBookList();

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <ul className={"list-page"}>
            {data!.nodes!.map((b) => (
                <li key={b.id} className={"list-item"}>
                    <BookCard book={b}/>
                </li>
            ))}
        </ul>
    );
}