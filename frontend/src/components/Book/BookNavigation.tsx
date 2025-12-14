import type { Book } from "../../plugins/api/books.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";
import { Link } from "react-router-dom";

interface BookNavigationProps {
    book: Book;
    chapter: number;
    verse: number;
}

export function BookNavigation({ book, chapter, verse }: BookNavigationProps) {
    const previousChapter: number | undefined =
        chapter > 1 ? chapter - 1 : undefined;
    const nextChapter: number = chapter + 1;
    const previousVerse: number | undefined = verse > 1 ? verse - 1 : undefined;
    const nextVerse: number = verse + 1;

    return (
        <FlexWidget>
            <h4>{book.title}</h4>
            <p>
                {previousChapter ? (
                    <Link to={`/book/${book.id}/edit/${previousChapter}/1`}>
                        &lt;
                    </Link>
                ) : (
                    "<"
                )}
                &nbsp;{chapter}&nbsp;
                <Link to={`/book/${book.id}/edit/${nextChapter}/1`}>&gt;</Link>
                &nbsp;:&nbsp;
                {previousVerse ? (
                    <Link
                        to={`/book/${book.id}/edit/${chapter}/${previousVerse}`}
                    >
                        &lt;
                    </Link>
                ) : (
                    "<"
                )}
                &nbsp;{verse}&nbsp;
                <Link to={`/book/${book.id}/edit/${chapter}/${nextVerse}`}>
                    &gt;
                </Link>
            </p>
        </FlexWidget>
    );
}
