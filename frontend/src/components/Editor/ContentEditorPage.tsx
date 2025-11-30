import {useParams} from "react-router-dom";
import {type Book, useBook} from "../../plugins/api/books.tsx";
import {useState} from "react";
import {type LivingWord, useLivingWord} from "../../plugins/api/words.tsx";
import ContentEditor from "./ContentEditor.tsx";

function ContentEditorPage() {
    const {id: bookId} = useParams<{ id: string }>();
    const {data, isLoading} = useBook(bookId!);
    const book: Book | undefined = data?.node;

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!book) {
        return <p>Book not found</p>;
    }

    return <ContentEditorLoader book={book}/>;
}

export function ContentEditorLoader({book}: { book: Book }) {
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState(1);
    const {data, isLoading} = useLivingWord(book.id, chapter, verse);
    const livingWord: LivingWord | undefined = data?.node;

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!livingWord) {
        return <p>Verse not found</p>;
    }

    return (
        <ContentEditor
            word={livingWord}
            book={book}
            chapter={chapter}
            onUpdateChapter={setChapter}
            verse={verse}
            onUpdateVerse={setVerse}
        />
    );
}

export default ContentEditorPage;