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

export type AddPersonPayload = {
    name: string;
    biography?: string | null;
};

export type UpdatePersonPayload = {
    id: string;
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

    return useMutation<PersonItemResponse, Error, AddPersonPayload>({
        mutationFn: (payload) =>
            apiPost<AddPersonPayload, PersonItemResponse>("person/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["persons"]});
        },
    });
}

export function useUpdatePerson() {
    const queryClient = useQueryClient();

    return useMutation<PersonItemResponse, Error, UpdatePersonPayload>({
        mutationFn: (payload) =>
            apiPost<UpdatePersonPayload, PersonItemResponse>(
                `person/${payload.id}/`,
                payload,
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["persons"]});
            queryClient.invalidateQueries({queryKey: ["persons", variables.id]});
        },
    });
}
