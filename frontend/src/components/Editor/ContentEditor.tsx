import {useState} from "react";
import {EditContent} from "./EditContent.tsx";
import {EditChapter} from "./EditChapter.tsx";
import {EditVerse} from "./EditVerse.tsx";
import {EditSubmit} from "./EditSubmit.tsx";
import {AddStory} from "./AddStory.tsx";
import {AddContext} from "./AddContext.tsx";
import {AddNarrator} from "./AddNarrator.tsx";
import {AddSpeaker} from "./AddSpeaker.tsx";
import {AddListener} from "./AddListener.tsx";
import {AddBystander} from "./AddBystander.tsx";
import {AddQuestion} from "./AddQuestion.tsx";
import {AddTruth} from "./AddTruth.tsx";
import {BookCardView} from "../Book/BookCard.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {ScriptureAfterCard, ScriptureBeforeCard} from "./ScriptureCard.tsx";
import LeftRightWidget from "../../widgets/containers/LeftRightWidget.tsx";
import {type LivingWord, useUpdateLivingWord} from "../../plugins/api/words.tsx";
import {type Book} from "../../plugins/api/books.tsx";
import useListState from "../../plugins/ListState.tsx";

interface ContentEditorViewProps {
    word: LivingWord;
    book: Book;
    chapter: number;
    onUpdateChapter: (chapter: number) => void;
    verse: number;
    onUpdateVerse: (verse: number) => void;
}

function ContentEditor({word, book, chapter, onUpdateChapter, verse, onUpdateVerse}: ContentEditorViewProps) {
    const {mutate: storeLivingWord, isPending, isError} = useUpdateLivingWord();
    const [content, setContent] = useState(word.content || "");
    const [notes, setNotes] = useState(word.notes || "");
    const [storyIds, addStoryId, removeStoryId, clearStoryIds] = useListState<string>(word.story_ids || []);
    const [contextIds, addContextId, removeContextId, clearContextIds] = useListState<string>(word.context_ids || []);
    const [questionIds, addQuestionId, removeQuestionId, clearQuestionIds] = useListState<string>(word.question_ids || []);
    const [truthIds, addTruthId, removeTruthId, clearTruthIds] = useListState<string>(word.truth_ids || []);
    const [narratorId, setNarratorId] = useState<string | null>(word.narrator_id);
    const [speakerId, setSpeakerId] = useState<string | null>(word.speaker_id);
    const [listenerId, setListenerId] = useState<string | null>(word.listener_id);
    const [bystanderId, setBystanderId] = useState<string | null>(word.bystander_id);

    function handleSubmit() {
        storeLivingWord({
            content,
            book_id: book.id,
            chapter,
            verse,
            notes,
            narrator_id: narratorId,
            speaker_id: speakerId,
            listener_id: listenerId,
            bystander_id: bystanderId,
            story_ids: storyIds,
            context_ids: contextIds,
            question_ids: questionIds,
            truth_ids: truthIds,
        })
    }

    return (
        <LeftRightWidget>
            <SpaceWidget>
                <BookCardView book={book} display={{withLink: false}}/>
                <ScriptureBeforeCard bookId={book.id} chapter={chapter} verse={verse}/>
                <EditContent title={"Content"} content={content} onChange={setContent}/>
                <ScriptureAfterCard bookId={book.id} chapter={chapter} verse={verse}/>
                {isPending && <p>Is storing...</p>}
                {isError && <p>An error occured! Try again later.</p>}
                <FlexWidget>
                    <EditChapter chapter={chapter} onChange={onUpdateChapter}/>
                    <EditVerse verse={verse} onChange={onUpdateVerse}/>
                    <EditSubmit onSubmit={handleSubmit}/>
                </FlexWidget>
                <EditContent title={"Write your notes here"} content={notes} onChange={setNotes}/>
            </SpaceWidget>
            <SpaceWidget>
                <FlexWidget>
                    <AddStory ids={storyIds} onAdd={addStoryId} onRemove={removeStoryId} onClear={clearStoryIds}/>
                    <AddContext ids={contextIds} onAdd={addContextId} onRemove={removeContextId} onClear={clearContextIds}/>
                </FlexWidget>
                <FlexWidget>
                    <AddTruth ids={truthIds} onAdd={addTruthId} onRemove={removeTruthId} onClear={clearTruthIds}/>
                    <AddQuestion ids={questionIds} onAdd={addQuestionId} onRemove={removeQuestionId} onClear={clearQuestionIds}/>
                </FlexWidget>
                <AddNarrator narratorId={narratorId} onChange={setNarratorId}/>
                <AddSpeaker speakerId={speakerId} onChange={setSpeakerId}/>
                <AddListener listenerId={listenerId} onChange={setListenerId}/>
                <AddBystander bystanderId={bystanderId} onChange={setBystanderId}/>
            </SpaceWidget>
        </LeftRightWidget>
    );
}

export default ContentEditor;