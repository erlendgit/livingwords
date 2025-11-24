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

export type AddQuestionPayload = {
    question: string;
    answer?: string | null;
};

export type UpdateQuestionPayload = {
    id: string;
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

    return useMutation<QuestionItemResponse, Error, AddQuestionPayload>({
        mutationFn: (payload) =>
            apiPost<AddQuestionPayload, QuestionItemResponse>("question/", payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });
}

export function useUpdateQuestion() {
    const queryClient = useQueryClient();

    return useMutation<QuestionItemResponse, Error, UpdateQuestionPayload>({
        mutationFn: (payload) =>
            apiPost<UpdateQuestionPayload, QuestionItemResponse>(
                `question/${payload.id}/`,
                payload,
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            queryClient.invalidateQueries({ queryKey: ["questions", variables.id] });
        },
    });
}
