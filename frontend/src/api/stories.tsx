import {useQuery} from "@tanstack/react-query";
import {apiGet} from "./api.tsx";

export type StoryListResponse = {
    nodes?: Story[];
    detail?: string;
}

export type StoryItemResponse = {
    node?: Story;
    detail?: string;
}

export type Story = {
    id: string;
    title: string;
}

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
