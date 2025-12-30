import { useEffect, useState } from "react";
import { EditContent } from "./EditContent.tsx";
import { EditSubmit } from "./EditSubmit.tsx";
import { AddStory } from "./AddStory.tsx";
import { AddContext } from "./AddContext.tsx";
import { AddNarrator } from "./AddNarrator.tsx";
import { AddSpeaker } from "./AddSpeaker.tsx";
import { AddListener } from "./AddListener.tsx";
import { AddBystander } from "./AddBystander.tsx";
import { AddQuestion } from "./AddQuestion.tsx";
import { AddTruth } from "./AddTruth.tsx";
import {
    FlexChapterVerseWidget,
    FlexWidget,
} from "../../widgets/layout/FlexWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import LeftRightWidget from "../../widgets/containers/LeftRightWidget.tsx";
import {
    type LivingWord,
    useUpdateLivingWord,
} from "../../plugins/api/words.tsx";
import { type Book } from "../../plugins/api/books.tsx";
import { useListModifiers } from "../../plugins/ListModifiers.tsx";
import { BookNavigation } from "../Book/BookNavigation.tsx";
import { ScriptureCardMulti } from "./ScriptureCard.tsx";
import { useNavigate } from "react-router-dom";
import { EditReset } from "./EditReset.tsx";

interface ContentEditorViewProps {
    word: LivingWord;
    book: Book;
    chapter: number;
    verse: number;
    versesBefore?: LivingWord[];
    versesAfter?: LivingWord[];
}

function ContentEditor(props: ContentEditorViewProps) {
    const navigate = useNavigate();
    const { word, book, chapter, verse } = props;
    const { versesBefore, versesAfter } = props;
    const navigateToNext = () => {
        navigate(`/book/${book.id}/edit/${chapter}/${verse + 1}`);
    };
    const {
        mutate: storeLivingWord,
        isPending,
        isError,
    } = useUpdateLivingWord({ successCallback: navigateToNext });
    const [formValues, setFormValues] = useState<LivingWord>(word);
    const setContent = (content: string) =>
        setFormValues({ ...formValues, content });
    const setNotes = (notes: string) => setFormValues({ ...formValues, notes });
    const setStoryIds = (story_ids: string[]) =>
        setFormValues({ ...formValues, story_ids });
    const [addStoryId, removeStoryId, clearStoryIds] = useListModifiers<string>(
        formValues.story_ids,
        setStoryIds,
    );
    const setContextIds = (context_ids: string[]) =>
        setFormValues({ ...formValues, context_ids });
    const [addContextId, removeContextId, clearContextIds] =
        useListModifiers<string>(formValues.context_ids, setContextIds);
    const setQuestionIds = (question_ids: string[]) =>
        setFormValues({ ...formValues, question_ids });
    const [addQuestionId, removeQuestionId, clearQuestionIds] =
        useListModifiers<string>(formValues.question_ids, setQuestionIds);
    const setTruthIds = (truth_ids: string[]) =>
        setFormValues({ ...formValues, truth_ids });
    const [addTruthId, removeTruthId, clearTruthIds] = useListModifiers<string>(
        formValues.truth_ids,
        setTruthIds,
    );
    const setNarratorId = (narrator_id: string | null) =>
        setFormValues({ ...formValues, narrator_id });
    const setSpeakerId = (speaker_id: string | null) =>
        setFormValues({ ...formValues, speaker_id });
    const setListenerId = (listener_id: string | null) =>
        setFormValues({ ...formValues, listener_id });
    const setBystanderId = (bystander_id: string | null) =>
        setFormValues({ ...formValues, bystander_id });

    useEffect(() => {
        setFormValues(word);
    }, [word]);

    function handleSubmit() {
        storeLivingWord(formValues);
    }

    return (
        <LeftRightWidget>
            <SpaceWidget>
                <BookNavigation book={book} chapter={chapter} verse={verse} />
                <ScriptureCardMulti verses={versesBefore} />
                <FlexWidget>
                    <FlexChapterVerseWidget chapter={chapter} verse={verse} />
                    <EditContent
                        title={"Content"}
                        content={formValues.content || ""}
                        onChange={setContent}
                    />
                </FlexWidget>
                <ScriptureCardMulti verses={versesAfter} />
                {isPending && <p>Is storing...</p>}
                {isError && <p>An error occured! Try again later.</p>}
                <EditContent
                    title={"Write your notes here"}
                    content={formValues.notes || ""}
                    onChange={setNotes}
                />
                <FlexWidget>
                    <EditReset
                        bookId={book.id}
                        chapter={chapter}
                        verse={verse}
                    />
                    <EditSubmit onSubmit={handleSubmit} />
                </FlexWidget>
            </SpaceWidget>
            <SpaceWidget>
                <FlexWidget>
                    <AddStory
                        ids={formValues.story_ids || []}
                        onAdd={addStoryId}
                        onRemove={removeStoryId}
                        onClear={clearStoryIds}
                    />
                    <AddContext
                        ids={formValues.context_ids || []}
                        onAdd={addContextId}
                        onRemove={removeContextId}
                        onClear={clearContextIds}
                    />
                </FlexWidget>
                <FlexWidget>
                    <AddTruth
                        ids={formValues.truth_ids || []}
                        onAdd={addTruthId}
                        onRemove={removeTruthId}
                        onClear={clearTruthIds}
                    />
                    <AddQuestion
                        ids={formValues.question_ids || []}
                        onAdd={addQuestionId}
                        onRemove={removeQuestionId}
                        onClear={clearQuestionIds}
                    />
                </FlexWidget>
                <AddNarrator
                    narratorId={formValues.narrator_id}
                    onChange={setNarratorId}
                />
                <AddSpeaker
                    speakerId={formValues.speaker_id}
                    onChange={setSpeakerId}
                />
                <AddListener
                    listenerId={formValues.listener_id}
                    onChange={setListenerId}
                />
                <AddBystander
                    bystanderId={formValues.bystander_id}
                    onChange={setBystanderId}
                />
            </SpaceWidget>
        </LeftRightWidget>
    );
}

export default ContentEditor;
