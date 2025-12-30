import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "./api.tsx";

export type BookListResponse = {
    nodes?: Book[];
    detail?: string;
};

export type BookItemResponse = {
    node?: Book;
    detail?: string;
};

export type BookPayload = {
    title: string;
    summary?: string;
    category?: string;
};

export type Book = {
    id: string;
    title: string;
    summary?: string;
};

export type BookStatsResponse = {
    book_count: string;
    categories: string[];
};

export type BookCategory = {
    category: string;
    books: Book[];
};

export type BooksByCategoryResponse = {
    nodes?: BookCategory[];
};

export function useBookList() {
    return useQuery({
        queryKey: ["books"],
        queryFn: () => apiGet<BookListResponse>("book/"),
        staleTime: 1000 * 60,
    });
}

export function useBookStats() {
    return useQuery({
        queryKey: ["books", "stats"],
        queryFn: () => apiGet<BookStatsResponse>("book/stats/"),
        staleTime: 1000 * 60,
    });
}

export function useBooksByCategory() {
    return useQuery({
        queryKey: ["books", "stats"],
        queryFn: () => apiGet<BooksByCategoryResponse>("book/by_category/"),
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

export function useAddBook() {
    const queryClient = useQueryClient();

    return useMutation<BookItemResponse, Error, BookPayload>({
        mutationFn: (payload) =>
            apiPost<BookPayload, BookItemResponse>("book/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["books", "stats"] });
        },
    });
}

export function useEditBook(id: string) {
    const queryClient = useQueryClient();

    return useMutation<BookItemResponse, Error, BookPayload>({
        mutationFn: (payload) =>
            apiPost<BookPayload, BookItemResponse>(`book/${id}/`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["books", "stats"] });
            queryClient.invalidateQueries({ queryKey: ["books", id] });
        },
    });
}
