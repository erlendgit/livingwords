import {Link, useParams} from "react-router-dom"
import {useBook} from "../../plugins/api/books.tsx";

export function BookDetail() {
    const {id} = useParams<{ id: string }>();
    const {data, isLoading, isError, error} = useBook(id!);

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!data!.node) return <p>Not found</p>;

    return (
        <div>
            <h2>{data!.node!.title}</h2>
            <Link to={`/book/${data!.node!.id}/edit`} role={"button"} className="primary">
                Write
            </Link>
        </div>
    );
}