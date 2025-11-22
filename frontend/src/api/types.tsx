export type BookListResponse = {
    nodes: Book[] | null;
    detail: string | null;
}

export type BookItemResponse = {
    node: Book | null;
    detail: string | null;
}

export type Book = {
  id: string;
  title: string;
};