import {useParams} from "react-router-dom";
import {SelectBook} from "./SelectBook.tsx";
import {useState} from "react";
import {EditContent} from "./EditContent.tsx";
import {EditChapter} from "./EditChapter.tsx";
import {EditVerse} from "./EditVerse.tsx";
import {EditSubmit} from "./EditSubmit.tsx";

export function Editor() {
    const {id: bookId} = useParams<{ id: string }>();
    const [content, setContent] = useState("");
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState(1);

    if (!bookId) {
        return <p>No book selected</p>;
    }

    function onSubmit() {
        console.log("Submit pressed!")
    }

    return (
        <div>
            <SelectBook bookId={bookId}/>
            Previous verses will go here.
            <EditContent content={content} onChange={setContent} />
            Next verses will go here.
            <div role={"group"} style={{ gap: "1rem" }}>
                <EditChapter chapter={chapter} onChange={setChapter} />
                <EditVerse verse={verse} onChange={setVerse} />
                <EditSubmit onSubmit={onSubmit}/>
            </div>

        </div>
    );
}