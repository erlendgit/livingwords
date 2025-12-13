import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "./api.tsx";
import type { Person } from "./persons.tsx";

export type Agency = {
    id: string;
    description: string;
    persons: Person[];
};

export type AgencyListResponse = {
    nodes?: Agency[];
    detail?: string;
};

export type AgencyItemResponse = {
    node?: Agency;
    detail?: string;
};

export type AgencyPayload = {
    description: string;
    person_ids?: string[];
};

export function useAgencyList() {
    return useQuery({
        queryKey: ["agencies"],
        queryFn: () => apiGet<AgencyListResponse>("agency/"),
        staleTime: 1000 * 60,
    });
}

export function useAgency(id: string) {
    return useQuery({
        queryKey: ["agencies", id],
        queryFn: () => apiGet<AgencyItemResponse>(`agency/${id}/`),
        staleTime: 1000 * 60,
    });
}

export function useAddAgency() {
    const queryClient = useQueryClient();

    return useMutation<AgencyItemResponse, Error, AgencyPayload>({
        mutationFn: (payload) =>
            apiPost<AgencyPayload, AgencyItemResponse>("agency/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agencies"] });
        },
    });
}

export function useUpdateAgency(id: string) {
    const queryClient = useQueryClient();

    return useMutation<AgencyItemResponse, Error, AgencyPayload>({
        mutationFn: (payload) =>
            apiPost<AgencyPayload, AgencyItemResponse>(
                `agency/${id}/`,
                payload,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agencies"] });
            queryClient.invalidateQueries({ queryKey: ["agencies", id] });
        },
    });
}
