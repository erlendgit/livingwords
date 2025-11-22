import {useBook} from "../../api/books.tsx";

interface SelectBookProps {
    bookId: string;
}

export function SelectBook({bookId}: SelectBookProps) {
    const {data, isLoading, isError, error} = useBook(bookId);

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!data!.node) return <p>Book not found</p>;

    return (
        <>
            <h2>Editing Book: {data!.node!.title}</h2>
        </>
    );
}
