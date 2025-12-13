import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "./api.tsx";

export type QuestionListResponse = {
    nodes?: Question[];
    detail?: string;
};

export type QuestionItemResponse = {
    node?: Question;
    detail?: string;
};

export type Question = {
    id: string;
    question: string;
    answer: string | null;
};

export type QuestionPayload = {
    question: string;
    answer?: string | null;
};

export function useQuestionList() {
    return useQuery({
        queryKey: ["questions"],
        queryFn: () => apiGet<QuestionListResponse>("question/"),
        staleTime: 1000 * 60,
    });
}

export function useQuestion(id: string) {
    return useQuery({
        queryKey: ["questions", id],
        queryFn: () => apiGet<QuestionItemResponse>(`question/${id}/`),
        staleTime: 1000 * 60,
    });
}

export function useAddQuestion() {
    const queryClient = useQueryClient();

    return useMutation<QuestionItemResponse, Error, QuestionPayload>({
        mutationFn: (payload) =>
            apiPost<QuestionPayload, QuestionItemResponse>(
                "question/",
                payload,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });
}

export function useUpdateQuestion(id: string) {
    const queryClient = useQueryClient();

    return useMutation<QuestionItemResponse, Error, QuestionPayload>({
        mutationFn: (payload) =>
            apiPost<QuestionPayload, QuestionItemResponse>(
                `question/${id}/`,
                payload,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            queryClient.invalidateQueries({ queryKey: ["questions", id] });
        },
    });
}
