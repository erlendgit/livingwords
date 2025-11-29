// truths.tsx
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {apiGet, apiPost} from "./api.tsx";

export type TruthListResponse = {
    nodes?: Truth[];
    detail?: string;
};

export type TruthItemResponse = {
    node?: Truth;
    detail?: string;
};

export type Truth = {
    id: string;
    statement: string;
};

export type AddTruthPayload = {
    statement: string;
};

export type UpdateTruthPayload = {
    id: string;
    statement: string;
};

export function useTruthList() {
    return useQuery({
        queryKey: ["truths"],
        queryFn: () => apiGet<TruthListResponse>("truth/"),
        staleTime: 1000 * 60,
    });
}

export function useTruth(id: string) {
    return useQuery({
        queryKey: ["truths", id],
        queryFn: () => apiGet<TruthItemResponse>(`truth/${id}/`),
        staleTime: 1000 * 60,
    });
}

export function useAddTruth() {
    const queryClient = useQueryClient();

    return useMutation<TruthItemResponse, Error, AddTruthPayload>({
        mutationFn: (payload) =>
            apiPost<AddTruthPayload, TruthItemResponse>("truth/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["truths"]});
        },
    });
}

export function useUpdateTruth() {
    const queryClient = useQueryClient();

    return useMutation<TruthItemResponse, Error, UpdateTruthPayload>({
        mutationFn: (payload) =>
            apiPost<UpdateTruthPayload, TruthItemResponse>(
                `truth/${payload.id}/`,
                payload,
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["truths"]});
            queryClient.invalidateQueries({queryKey: ["truths", variables.id]});
        },
    });
}
