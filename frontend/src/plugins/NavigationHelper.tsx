import type { LivingWord } from "./api/words.tsx";

interface LastKnownNavigationProps {
    versesBefore?: LivingWord[];
}

export function useLastKnownNavigation({
    versesBefore,
}: LastKnownNavigationProps) {
    if (!versesBefore || versesBefore.length === 0) {
        return {};
    }
    const lastKnownVerseData = versesBefore[versesBefore.length - 1];
    return {
        lastKnownChapter: lastKnownVerseData.chapter,
        lastKnownVerse: lastKnownVerseData.verse,
    };
}
