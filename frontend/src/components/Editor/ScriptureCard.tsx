import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import { type LivingWord, useLivingWord } from "../../plugins/api/words.tsx";
import {
    FlexChapterVerseWidget,
    FlexWidget,
} from "../../widgets/layout/FlexWidget.tsx";
import { Box } from "@mui/material";

interface ScriptureCardMultiProps {
    verses?: LivingWord[];
}

export function ScriptureCardMulti(props: ScriptureCardMultiProps) {
    const { verses } = props;
    const hasVerses = verses && verses.length > 0;

    if (!hasVerses) {
        return null;
    }

    return (
        <SpaceWidget>
            {verses.map((verse, index) => (
                <ScriptureCard key={index} verse={verse} />
            ))}
        </SpaceWidget>
    );
}

interface ScriptureCardProps {
    verse: LivingWord;
}

export function ScriptureCard(props: ScriptureCardProps) {
    const { verse: _verse } = props;
    const { data, isLoading, error } = useLivingWord(
        _verse.book_id,
        _verse.chapter,
        _verse.verse,
    );
    const verse = data?.node;

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading verse: {error.message}</div>;
    }
    if (!verse) {
        return <div>Verse not found.</div>;
    }

    return (
        <FlexWidget>
            <FlexChapterVerseWidget
                chapter={verse.chapter}
                verse={verse.verse}
            />
            <Box>{verse.content}</Box>
        </FlexWidget>
    );
}
