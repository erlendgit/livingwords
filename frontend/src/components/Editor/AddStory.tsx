import {useState} from "react";
import {StoryCard} from "../Story/StoryCard.tsx";
import {StorySelectModal} from "../Story/StorySelectModal.tsx";

interface AddStoryProps {
    storyId: string | null;
    onChange: (value: string | null) => void;
}

export function AddStory({storyId, onChange}: AddStoryProps) {
    const [edit, setEdit] = useState<boolean>(false)

    function onCloseModal() {
        setEdit(false)
    }

    return (
        <div className={"add-story"}>
            {storyId && <StoryCard storyId={storyId}/>}
            <a href={"#"} onClick={() => setEdit(true)}>Select story</a>
            {edit && <StorySelectModal storyId={storyId} onChange={onChange} onClose={onCloseModal}/>}
        </div>
    );
}