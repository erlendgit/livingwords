import {useEffect, useState} from "react";
import {type Story, useAddStory} from "../../api/stories.tsx";

interface StoryAddFormProps {
    selectStory: (value: string) => void,
    onClose: () => void,
}

export function StoryAddSelectForm({selectStory, onClose}: StoryAddFormProps) {
    const {mutate: addStory, data, isPending, isError} = useAddStory()
    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const story: Story | undefined = data?.node

    function onSave() {
        addStory({title, summary})
    }

    useEffect(() => {
        if (story && !isPending && !isError) {
            selectStory(story.id)
        }
    }, [story, isPending, isError])

    return <>
        <fieldset>
            <input type={"text"}
                   placeholder={"Enter title..."} value={title}
                   onChange={(e) => setTitle(e.target.value || "")}/>
            <textarea placeholder={"Enter summary..."} value={summary}
                      onChange={(e) => setSummary(e.target.value)}></textarea>
        </fieldset>
        {isPending && <p>Storing the story...</p>}
        {isError && <p>Story could not be stored.</p>}
        <div className={"grid"}>
            <button onClick={onSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </>
}
