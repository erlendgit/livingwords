import {useParams} from "react-router-dom";
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
import {BookCard} from "../Book/BookCard.tsx";
import {GridContainerWidget, GridItemWidget} from "../../widgets/GridWidget.tsx";

export function ContentEditor() {
    const {id: bookId} = useParams<{ id: string }>();
    const [content, setContent] = useState("");
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState(1);
    const [notes, setNotes] = useState("");
    const [storyId, setStoryId] = useState<string | null>(null);
    const [contextId, setContextId] = useState<string | null>(null);
    const [narratorId, setNarratorId] = useState<string | null>(null);
    const [speakerId, setSpeakerId] = useState<string | null>(null);
    const [listenerId, setListenerId] = useState<string | null>(null);
    const [bystanderId, setBystanderId] = useState<string | null>(null);
    const [questionIds, setQuestionIds] = useState<string[]>([]);
    const [truthIds, setTruthIds] = useState<string[]>([]);

    if (!bookId) {
        return <p>No book selected</p>;
    }

    function onSubmit() {
        console.log("Submit pressed!")
    }

    return (
        <GridContainerWidget>
            <GridItemWidget size={6}>
                <BookCard bookId={bookId} display={{withLink: false}}/>
                Previous content will go here.
                <EditContent title={"Write your content here"} content={content} onChange={setContent}/>
                Next content will go here.
                <div className={"grid"}>
                    <EditChapter chapter={chapter} onChange={setChapter}/>
                    <EditVerse verse={verse} onChange={setVerse}/>
                    <EditSubmit onSubmit={onSubmit}/>
                </div>
                <EditContent title={"Write your notes here"} content={notes} onChange={setNotes}/>
            </GridItemWidget>
            <GridItemWidget size={6}>
                <div className={"grid"}>
                    <AddStory storyId={storyId} onChange={setStoryId}/>
                    <AddContext contextId={contextId} onChange={setContextId}/>
                </div>
                <div className={"grid"}>
                    <AddTruth truthIds={truthIds} onChange={setTruthIds}/>
                    <AddQuestion questionIds={questionIds} onChange={setQuestionIds}/>
                </div>
                <AddNarrator narratorId={narratorId} onChange={setNarratorId}/>
                <AddSpeaker speakerId={speakerId} onChange={setSpeakerId}/>
                <AddListener listenerId={listenerId} onChange={setListenerId}/>
                <AddBystander bystanderId={bystanderId} onChange={setBystanderId}/>
            </GridItemWidget>
        </GridContainerWidget>
    );
}