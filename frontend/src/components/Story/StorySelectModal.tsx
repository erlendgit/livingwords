import {useState} from "react";
import {StoryAddForm} from "./StoryAddForm.tsx";
import {StorySelectList} from "./StorySelectList.tsx";

interface StorySelectModalProps {
    storyId: string | null,
    onChange: (value: string | null) => void,
    onClose: () => void
}

export function StorySelectModal({storyId, onChange, onClose}: StorySelectModalProps) {
    const [addStory, setAddStory] = useState<boolean>()

    function onSelectStory(storyId: string | null) {
        onChange(storyId)
        onClose()
    }

    function onStartCreateStory() {
        setAddStory(true)
    }

    function onEndCreateStory() {
        setAddStory(false)
    }

    return (
        <>
            <dialog id="modal" open>
                <article>
                    <header>
                        <h3>Select or add a story</h3>
                        <button onClick={() => onClose()}>Close</button>
                    </header>

                    {addStory && (
                        <StoryAddForm onSave={onSelectStory} onClose={onEndCreateStory}/>
                    )}
                    {!addStory && (<>
                        <StorySelectList storyId={storyId} onChange={onSelectStory}/>
                        <button onClick={onStartCreateStory}>Add story</button>
                    </>)}

                </article>
            </dialog>
        </>
    );
}


