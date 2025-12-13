// stories.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "./api.tsx";

export type StoryListResponse = {
    nodes?: Story[];
    detail?: string;
};

export type StoryItemResponse = {
    node?: Story;
    detail?: string;
};

export type Story = {
    id: string;
    title: string;
    summary: string;
};

export type StoryPayload = {
    title: string;
    summary: string;
};

export function useStoryList() {
    return useQuery({
        queryKey: ["stories"],
        queryFn: () => apiGet<StoryListResponse>("story/"),
        staleTime: 1000 * 60,
    });
}

export function useStory(id: string) {
    return useQuery({
        queryKey: ["stories", id],
        queryFn: () => apiGet<StoryItemResponse>(`story/${id}/`),
        staleTime: 1000 * 60,
    });
}

export function useAddStory() {
    const queryClient = useQueryClient();

    return useMutation<StoryItemResponse, Error, StoryPayload>({
        mutationFn: (payload) =>
            apiPost<StoryPayload, StoryItemResponse>("story/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        },
    });
}

export function useUpdateStory(id: string) {
    const queryClient = useQueryClient();

    return useMutation<StoryItemResponse, Error, StoryPayload>({
        mutationFn: (payload) =>
            apiPost<StoryPayload, StoryItemResponse>(`story/${id}/`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
            queryClient.invalidateQueries({ queryKey: ["stories", id] });
        },
    });
}
