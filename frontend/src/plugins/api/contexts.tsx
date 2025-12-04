// stories.tsx
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {apiGet, apiPost} from "./api.tsx";

export type ContextListResponse = {
    nodes?: Context[];
    detail?: string;
};

export type ContextItemResponse = {
    node?: Context;
    detail?: string;
};

export type Context = {
    id: string;
    description: string;
};

export type ContextPayload = {
    description: string;
};

export function useContextList() {
    return useQuery({
        queryKey: ["contexts"],
        queryFn: () => apiGet<ContextListResponse>("context/"),
        staleTime: 1000 * 60,
    });
}

export function useContext(id: string) {
    return useQuery({
        queryKey: ["contexts", id],
        queryFn: () => apiGet<ContextItemResponse>(`context/${id}/`),
        staleTime: 1000 * 60,
    });
}

export function useAddContext() {
    const queryClient = useQueryClient();

    return useMutation<ContextItemResponse, Error, ContextPayload>({
        mutationFn: (payload) => apiPost<ContextPayload, ContextItemResponse>("context/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["contexts"]});
        },
    });
}

export function useUpdateContext(id: string) {
    const queryClient = useQueryClient();

    return useMutation<ContextItemResponse, Error, ContextPayload>({
        mutationFn: (payload) =>
            apiPost<ContextPayload, ContextItemResponse>(`context/${id}/`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["contexts"]});
            queryClient.invalidateQueries({queryKey: ["contexts", id]});
        },
    });
}