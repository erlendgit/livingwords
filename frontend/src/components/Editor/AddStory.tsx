import {useState} from "react";
import {StoryCard} from "../Story/StoryCard.tsx";
import {StorySelector} from "../Story/StorySelector.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";

interface AddStoryProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddStory({ids, onAdd, onRemove, onClear}: AddStoryProps) {
    const [edit, setEdit] = useState<boolean>(false)
    const handleOpen = () => setEdit(true);
    const handleClose = () => setEdit(false);

    return (
        <SpaceWidget>
            {ids && (
                <ul>
                    {ids.map((storyId) => (
                        <StoryCard storyId={storyId}/>
                    ))}
                </ul>
            )}
            <FlexWidget>
                <SmallButtonWidget size={"small"} onClick={handleOpen}>Select story</SmallButtonWidget>
                {ids && <SmallButtonWidget onClick={() => onClear()}>Clear value</SmallButtonWidget>}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget title={"Select a story"} onCancel={handleClose}>
                    <StorySelector ids={ids} onAdd={onAdd} onRemove={onRemove} onClose={handleClose}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}