import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";

interface ScriptureCardProps {
    bookId: string;
    chapter: number;
    verse: number;
}

export function ScriptureBeforeCard({
    bookId,
    chapter,
    verse,
}: ScriptureCardProps) {
    return (
        <SpaceWidget>
            Scripture Before: {bookId} {chapter}:{verse}
        </SpaceWidget>
    );
}

export function ScriptureAfterCard({
    bookId,
    chapter,
    verse,
}: ScriptureCardProps) {
    return (
        <SpaceWidget>
            Scripture After: {bookId} {chapter}:{verse}
        </SpaceWidget>
    );
}
