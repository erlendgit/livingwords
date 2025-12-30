import { useParams } from "react-router-dom";
import { type Book, useBook } from "../../plugins/api/books.tsx";
import {
    type LivingWord,
    type LivingWordListResponse,
    useLivingWord,
} from "../../plugins/api/words.tsx";
import ContentEditor from "./ContentEditor.tsx";

function ContentEditorPage() {
    const { id: bookId } = useParams<{ id: string }>();
    const { chapter: chapterInput } = useParams<{ chapter: string }>();
    const { verse: verseInput } = useParams<{ verse: string }>();
    const { data, isLoading } = useBook(bookId!);
    const book: Book | undefined = data?.node;
    const chapter: number = chapterInput ? parseInt(chapterInput, 10) : 1;
    const verse: number = verseInput ? parseInt(verseInput, 10) : 1;

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!book) {
        return <p>Book not found</p>;
    }

    return <ContentEditorLoader book={book} chapter={chapter} verse={verse} />;
}

interface ContentEditorLoaderProps {
    book: Book;
    chapter: number;
    verse: number;
}

export function ContentEditorLoader({
    book,
    chapter,
    verse,
}: ContentEditorLoaderProps) {
    const { data, isLoading } = useLivingWord(book.id, chapter, verse);
    const livingWord: LivingWord | undefined = data?.node;
    const versesBefore: LivingWordListResponse | undefined = data?.before;
    const versesAfter: LivingWordListResponse | undefined = data?.after;

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!livingWord) {
        return <p>Verse not found</p>;
    }

    console.log("rebuild with", livingWord);

    return (
        <ContentEditor
            word={livingWord}
            book={book}
            chapter={chapter}
            verse={verse}
            versesBefore={versesBefore?.nodes}
            versesAfter={versesAfter?.nodes}
        />
    );
}

export default ContentEditorPage;
