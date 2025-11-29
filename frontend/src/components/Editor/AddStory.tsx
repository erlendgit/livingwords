import {useState} from "react";
import {StoryCard} from "../Story/StoryCard.tsx";
import {StorySelector} from "../Story/StorySelector.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";

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
        <SpaceWidget>
            {storyId && <StoryCard storyId={storyId}/>}
            <FlexWidget>
                <SmallButtonWidget size={"small"} onClick={() => setEdit(true)}>Select story</SmallButtonWidget>
                {storyId && <SmallButtonWidget onClick={() => onChange(null)}>Clear story</SmallButtonWidget>}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget title={"Select a story"} onCancel={handleClose}>
                    <StorySelector storyId={storyId} onChange={onChange} onClose={handleClose}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}