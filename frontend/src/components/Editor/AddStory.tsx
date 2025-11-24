import {useState} from "react";
import {StoryCard} from "../Story/StoryCard.tsx";
import {StorySelector} from "../Story/StorySelector.tsx";
import {ModalDialog} from "../../layouts/ModalDialog.tsx";

interface AddStoryProps {
    storyId: string | null;
    onChange: (value: string | null) => void;
}

export function AddStory({storyId, onChange}: AddStoryProps) {
    const [edit, setEdit] = useState<boolean>(false)

    function handleClose() {
        setEdit(false)
    }

    return (
        <div className={"add-story"}>
            {storyId && <StoryCard storyId={storyId}/>}
            <div role={"group"}>
                <button onClick={() => setEdit(true)}>Select story</button>
                {storyId && <button onClick={() => onChange(null)}>Clear story</button>}
            </div>

            {edit && (
                <ModalDialog title={"Select a story"} onCancel={handleClose}>
                    <StorySelector storyId={storyId} onChange={onChange} onClose={handleClose}/>
                </ModalDialog>
            )}
        </div>
    );
}