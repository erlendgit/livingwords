import {useState} from "react";
import {StoryCard} from "../Story/StoryCard.tsx";
import {StorySelector} from "../Story/StorySelector.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";

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
            <div className={"grid"}>
                <button onClick={() => setEdit(true)}>Select story</button>
                {storyId && <button onClick={() => onChange(null)}>Clear story</button>}
            </div>

            {edit && (
                <ModalDialogWidget title={"Select a story"} onCancel={handleClose}>
                    <StorySelector storyId={storyId} onChange={onChange} onClose={handleClose}/>
                </ModalDialogWidget>
            )}
        </div>
    );
}