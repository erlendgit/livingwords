import { useState } from "react";
import { StoryCard } from "../Story/StoryCard.tsx";
import { StorySelector } from "../Story/StorySelector.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";

const StoryIdList = ItemTableWidget<string>;

interface AddStoryProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddStory({ ids, onAdd, onRemove, onClear }: AddStoryProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const hasStories = ids.length > 0;

    const handleOpenModal = () => setEdit(true);
    const handleCloseModal = () => setEdit(false);

    return (
        <SpaceWidget>
            {hasStories && (
                <StoryIdList
                    items={ids}
                    columnCallbacks={[
                        (storyId: string) => <StoryCard storyId={storyId} />,
                        (storyId: string) => (
                            <TextButtonWidget onClick={() => onRemove(storyId)}>
                                Deselect
                            </TextButtonWidget>
                        ),
                    ]}
                />
            )}
            <FlexWidget>
                <SmallButtonWidget size={"small"} onClick={handleOpenModal}>
                    Select story
                </SmallButtonWidget>
                {hasStories && (
                    <SmallButtonWidget onClick={() => onClear()}>
                        Clear value
                    </SmallButtonWidget>
                )}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget
                    title={"Select a story"}
                    onCancel={handleCloseModal}
                >
                    <StorySelector
                        ids={ids}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onClose={handleCloseModal}
                    />
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}
