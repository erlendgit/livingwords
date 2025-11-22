import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./api";

export type BookListResponse = {
    nodes?: Book[];
    detail?: string;
}

export type BookItemResponse = {
    node?: Book;
    detail?: string;
}

export type Book = {
    id: string;
    title: string;
};

export function useBookList() {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => apiGet<BookListResponse>("book/"),
    staleTime: 1000 * 60,
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => apiGet<BookItemResponse>(`book/${id}/`),
    staleTime: 1000 * 60,
  });
}
