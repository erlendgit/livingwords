import {useState} from "react";
import {StoryCard} from "../Story/StoryCard.tsx";
import {StorySelector} from "../Story/StorySelector.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {TableWidget} from "../../widgets/containers/TableWidget.tsx";

interface AddStoryProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddStory({ids, onAdd, onRemove, onClear}: AddStoryProps) {
    const [edit, setEdit] = useState<boolean>(false)
    const hasStories = ids.length > 0;

    const handleOpenModal = () => setEdit(true);
    const handleCloseModal = () => setEdit(false);

    return (
        <SpaceWidget>
            {hasStories && (
                <TableWidget>
                    {ids.map((storyId) => (
                        <tr>
                            <td>
                                <StoryCard storyId={storyId}/>
                            </td>
                            <td>
                                <TextButtonWidget onClick={() => onRemove(storyId)}>
                                    Remove
                                </TextButtonWidget>
                            </td>
                        </tr>
                    ))}
                </TableWidget>
            )}
            <FlexWidget>
                <SmallButtonWidget size={"small"} onClick={handleOpenModal}>Select story</SmallButtonWidget>
                {hasStories && <SmallButtonWidget onClick={() => onClear()}>Clear value</SmallButtonWidget>}
            </FlexWidget>
            {
                edit && (
                    <ModalDialogWidget title={"Select a story"} onCancel={handleCloseModal}>
                        <StorySelector ids={ids} onAdd={onAdd} onRemove={onRemove} onClose={handleCloseModal}/>
                    </ModalDialogWidget>
                )
            }
        </SpaceWidget>
    );
}