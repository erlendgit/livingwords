import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {apiGet, apiPost} from "./api.tsx";

export type Person = {
    id: string;
    name: string;
    biography: string | null;
};

export type PersonListResponse = {
    nodes?: Person[];
    detail?: string;
};

export type PersonItemResponse = {
    node?: Person;
    detail?: string;
};

export type PersonPayload = {
    name: string;
    biography?: string | null;
};

export function usePersonList() {
    return useQuery({
        queryKey: ["persons"],
        queryFn: () => apiGet<PersonListResponse>("person/"),
        staleTime: 1000 * 60,
    });
}

export function usePerson(id: string) {
    return useQuery({
        queryKey: ["persons", id],
        queryFn: () => apiGet<PersonItemResponse>(`person/${id}/`),
        staleTime: 1000 * 60,
    });
}

export function useAddPerson() {
    const queryClient = useQueryClient();

    return useMutation<PersonItemResponse, Error, PersonPayload>({
        mutationFn: (payload) =>
            apiPost<PersonPayload, PersonItemResponse>("person/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["persons"]});
        },
    });
}

export function useUpdatePerson(id: string) {
    const queryClient = useQueryClient();

    return useMutation<PersonItemResponse, Error, PersonPayload>({
        mutationFn: (payload) =>
            apiPost<PersonPayload, PersonItemResponse>(
                `person/${id}/`,
                payload,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["persons"]});
            queryClient.invalidateQueries({queryKey: ["persons", id]});
        },
    });
}
