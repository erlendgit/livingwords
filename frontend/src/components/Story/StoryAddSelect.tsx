import {useEffect, useState} from "react";
import {type Story, useAddStory} from "../../plugins/api/stories.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

interface StoryAddProps {
    selectStory: (value: string) => void,
    onClose: () => void,
}

export function StoryAddSelect({selectStory, onClose}: StoryAddProps) {
    const {mutate: addStory, data, isPending, isError} = useAddStory()
    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const story: Story | undefined = data?.node

    function handleSave() {
        addStory({title, summary})
    }

    useEffect(() => {
        if (story && !isPending && !isError) {
            selectStory(story.id)
        }
    }, [selectStory, story, isPending, isError])

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
        <DialogActionsWidget>
            <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
            <SmallButtonWidget onClick={onClose}>Cancel</SmallButtonWidget>
        </DialogActionsWidget>
    </>
}
