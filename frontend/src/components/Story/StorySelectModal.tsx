import {useState} from "react";
import {StoryAddForm} from "./StoryAddForm.tsx";
import {StorySelectList} from "./StorySelectList.tsx";
import {ModalDialog} from "../../layouts/ModalDialog.tsx";

interface StorySelectModalProps {
    storyId: string | null,
    onChange: (value: string | null) => void,
    onClose: () => void
}

export function StorySelectModal({storyId, onChange, onClose}: StorySelectModalProps) {
    const [addStory, setAddStory] = useState<boolean>()
    const onStartCreateStory = () => setAddStory(true)
    const onEndCreateStory = () => setAddStory(false)

    function onSelectStory(storyId: string | null) {
        onChange(storyId)
        onClose()
    }

    // Er valt nog wat voor te zeggen om de StoryAddForm wél in de StorySelectList
    // onder te brengen. Dan kan ie onthouden waar ie is gebleven bij pagineren.
    // (eigenlijk is dit een rode vlag)

    if (addStory) {
        return (
            <ModalDialog title={"Add a story"}>
                <StoryAddForm onSave={onSelectStory} onClose={onEndCreateStory}/>
            </ModalDialog>
        )
    } else {
        return (
            <ModalDialog title={"Select a story"}>
                <StorySelectList storyId={storyId} onChange={onSelectStory}/>
                <div className={"grid"}>
                    <button onClick={onStartCreateStory}>Add story</button>
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </ModalDialog>
        )
    }
}


