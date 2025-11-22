import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./api";
import type {BookItemResponse, BookListResponse} from "./types";

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
