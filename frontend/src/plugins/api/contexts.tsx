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

export type AddContextPayload = {
    description: string;
};

export type UpdateContextPayload = {
    id: string;
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

    return useMutation<ContextItemResponse, Error, AddContextPayload>({
        mutationFn: (payload) => apiPost<AddContextPayload, ContextItemResponse>("context/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["contexts"]});
        },
    });
}

export function useUpdateContext() {
    const queryClient = useQueryClient();

    return useMutation<ContextItemResponse, Error, UpdateContextPayload>({
        mutationFn: (payload) =>
            apiPost<UpdateContextPayload, ContextItemResponse>(`context/${payload.id}/`, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["contexts"]});
            queryClient.invalidateQueries({queryKey: ["contexts", variables.id]});
        },
    });
}