import type { Book } from "../../plugins/api/books.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";
import { Link } from "react-router-dom";

interface BookNavigationProps {
    book: Book;
    chapter: number;
    verse: number;
    lastKnownChapter?: number;
    lastKnownVerse?: number;
}

export function BookNavigation(props: BookNavigationProps) {
    const { book, chapter, verse } = props;
    const previousChapterLink = CreatePreviousChapterLink(props)
    const nextChapterLink = CreateNextChapterLink(props)
    const previousVerseLink = CreatePreviousVerseLink(props)
    const nextVerseLink = CreateNextVerseLink(props)

    return (
        <FlexWidget>
            <h4>{book.title}</h4>
            <p>
                {previousChapterLink ? (
                    <Link to={previousChapterLink}>
                        &lt;
                    </Link>
                ) : (
                    "<"
                )}
                &nbsp;{chapter}&nbsp;
                <Link to={nextChapterLink}>&gt;</Link>
                &nbsp;:&nbsp;
                {previousVerseLink ? (
                    <Link
                        to={previousVerseLink}
                    >
                        &lt;
                    </Link>
                ) : (
                    "<"
                )}
                &nbsp;{verse}&nbsp;
                <Link to={nextVerseLink}>
                    &gt;
                </Link>
            </p>
        </FlexWidget>
    );
}

function CreatePreviousChapterLink(props: BookNavigationProps) {
    const { book, chapter } = props;
    const previousChapter: number | undefined =
        chapter > 1 ? chapter - 1 : undefined;
    const previousVerse: number = 1;

    if (previousChapter) {
        return `/book/${book.id}/edit/${previousChapter}/${previousVerse}`;
    } else {
        return undefined;
    }
}

function CreateNextChapterLink(props: BookNavigationProps) {
    const { book, chapter } = props;
    const nextChapter: number = chapter + 1;
    return `/book/${book.id}/edit/${nextChapter}/1`;
}

function CreatePreviousVerseLink(props: BookNavigationProps) {
    const { book, chapter, verse } = props;
    const { lastKnownChapter, lastKnownVerse } = props;
    let previousChapter: number = chapter;
    let previousVerse: number | undefined =
        verse > 1 ? verse - 1 : undefined;

    if (lastKnownChapter && lastKnownVerse) {
        previousChapter = lastKnownChapter;
        previousVerse = lastKnownVerse;
    }
    if (previousVerse) {
        return `/book/${book.id}/edit/${previousChapter}/${previousVerse}`;
    } else {
        return undefined;
    }
}

function CreateNextVerseLink(props: BookNavigationProps) {
    const { book, chapter, verse } = props;
    const nextVerse: number = verse + 1;
    return `/book/${book.id}/edit/${chapter}/${nextVerse}`;
}