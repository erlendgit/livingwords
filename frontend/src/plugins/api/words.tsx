import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPost } from "./api.tsx";

export type LivingWordListResponse = {
    nodes?: LivingWord[];
    detail?: string;
};

export type LivingWordResponse = {
    node?: LivingWord;
    before?: LivingWordListResponse;
    after?: LivingWordListResponse;
    detail?: string;
};

export type CrossReference = {
    book_id: string;
    chapter: number;
    verse: number;
    content?: string;
};

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
    references: CrossReference[];
};

export function useLivingWord(bookId: string, chapter: number, verse: number) {
    return useQuery({
        queryKey: ["words", bookId, chapter, verse],
        queryFn: () =>
            apiGet<LivingWordResponse>(`word/${bookId}/${chapter}/${verse}/`),
        staleTime: 1000 * 60,
    });
}

interface UseUpdateLivingWordProps {
    successCallback?: () => void;
}

export function useUpdateLivingWord(props?: UseUpdateLivingWordProps) {
    const queryClient = useQueryClient();
    const { successCallback } = props || {};

    return useMutation<LivingWordResponse, Error, LivingWord>({
        mutationFn: (payload) =>
            apiPost<LivingWord, LivingWordResponse>(`word/`, payload),
        onSuccess: (_, payload) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "words",
                    payload.book_id,
                    payload.chapter,
                    payload.verse,
                ],
            });
            if (successCallback) {
                successCallback();
            }
        },
    });
}

interface BookChapterVerse {
    bookId: string;
    chapter: number;
    verse: number;
}

export function useResetLivingWord() {
    const queryClient = useQueryClient();

    return useMutation<LivingWordResponse, Error, BookChapterVerse>({
        mutationFn: (props) =>
            apiDelete<LivingWordResponse>(
                `word/${props.bookId}/${props.chapter}/${props.verse}/`,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["words"],
            });
        },
    });
}
