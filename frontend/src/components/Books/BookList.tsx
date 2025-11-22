import {useBookList} from "../../api/books.tsx";
import {BookCardView} from "./BookCard.tsx";

export function BookList() {
    const {data, isLoading, isError, error} = useBookList();

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <ul className={"list-page"}>
            {data!.nodes!.map((b) => (
                <li key={b.id} className={"list-item"}>
                    <BookCardView book={b}/>
                </li>
            ))}
        </ul>
    );
}