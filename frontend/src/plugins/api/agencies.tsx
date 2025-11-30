import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {apiGet, apiPost} from "./api.tsx";
import type {Person} from "./persons.tsx";

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

export type AddAgencyPayload = {
    description: string;
    person_ids?: string[];
};

export type UpdateAgencyPayload = {
    id: string;
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

    return useMutation<AgencyItemResponse, Error, AddAgencyPayload>({
        mutationFn: (payload) =>
            apiPost<AddAgencyPayload, AgencyItemResponse>("agency/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["agencies"]});
        },
    });
}

export function useUpdateAgency() {
    const queryClient = useQueryClient();

    return useMutation<AgencyItemResponse, Error, UpdateAgencyPayload>({
        mutationFn: (payload) =>
            apiPost<UpdateAgencyPayload, AgencyItemResponse>(
                `agency/${payload.id}/`,
                payload,
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["agencies"]});
            queryClient.invalidateQueries({queryKey: ["agencies", variables.id]});
        },
    });
}
