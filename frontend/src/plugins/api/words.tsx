import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {apiGet, apiPost} from "./api.tsx";

export type LivingWordListResponse = {
    nodes?: LivingWord[];
    detail?: string;
};

export type LivingWordResponse = {
    node?: LivingWord;
    before?: LivingWordListResponse;
    after?: LivingWordListResponse;
    detail?: string;
}

export type LivingWord = {
    content: string;
    book_id: string;
    chapter: number;
    verse: number;
    notes: string;
    narrator_id: string | null;
    speaker_id: string | null;
    listener_id: string | null;
    bystander_id: string | null;
    story_ids: string[];
    context_ids: string[];
    question_ids: string[];
    truth_ids: string[];
};

export function useLivingWord(bookId: string, chapter: number, verse: number) {
    return useQuery({
        queryKey: ["words", bookId, chapter, verse],
        queryFn: () => apiGet<LivingWordResponse>(`word/${bookId}/${chapter}/${verse}/`),
        staleTime: 1000 * 60,
    });
}

export function useUpdateLivingWord() {
    const queryClient = useQueryClient();

    return useMutation<LivingWordResponse, Error, LivingWord>({
        mutationFn: (payload) =>
            apiPost<LivingWord, LivingWordResponse>(`word/`, payload),
        onSuccess: (_, payload) => {
            queryClient.invalidateQueries({queryKey: ["words", payload.book_id, payload.chapter, payload.verse]});
        },
    });
}