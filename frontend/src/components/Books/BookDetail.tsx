import { useParams } from "react-router-dom"
import {useBook} from "../../api/books.tsx";

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useBook(id!);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <h1>{data!.node!.title}</h1>
      <p>Details volgen later</p>
    </div>
  );
}