import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiGet, apiPost} from "./api";

export type BookListResponse = {
    nodes?: Book[];
    detail?: string;
}

export type BookItemResponse = {
    node?: Book;
    detail?: string;
}

export type AddBookPayload = {
    title: string,
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

export function useAddBook() {
    const queryClient = useQueryClient();

    return useMutation<BookItemResponse, Error, AddBookPayload>({
        mutationFn: (payload) => apiPost<AddBookPayload, BookItemResponse>("book/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["books"]});
        },
    });
}
