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

export type TruthPayload = {
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

    return useMutation<TruthItemResponse, Error, TruthPayload>({
        mutationFn: (payload) =>
            apiPost<TruthPayload, TruthItemResponse>("truth/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["truths"]});
        },
    });
}

export function useUpdateTruth(id: string) {
    const queryClient = useQueryClient();

    return useMutation<TruthItemResponse, Error, TruthPayload>({
        mutationFn: (payload) =>
            apiPost<TruthPayload, TruthItemResponse>(
                `truth/${id}/`,
                payload,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["truths"]});
            queryClient.invalidateQueries({queryKey: ["truths", id]});
        },
    });
}
