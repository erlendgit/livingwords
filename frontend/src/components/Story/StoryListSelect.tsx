import {type Story, useStoryList} from "../../plugins/api/stories.tsx";
import {StoryCardView} from "./StoryCard.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";

const StoryList = ItemTableWidget<Story>;

interface StoryListSelectProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClickAdd: () => void,
    onClose: () => void,
}

export function StoryListSelect({ids, onAdd, onRemove, onClose, onClickAdd}: StoryListSelectProps) {
    const {data, isLoading, isError} = useStoryList();
    const stories: Story[] = data?.nodes || [];

    if (isLoading) {
        return <p>Loading stories...</p>
    }
    if (isError) {
        return <p>Error while loading stories!</p>
    }

    return (
        <>
            {stories.length > 0 &&
                <StoryList
                    items={stories}
                    columnCallbacks={[
                        (story: Story) => <StoryCardView story={story}/>,
                        (story: Story) => (
                            <>
                                {ids.includes(story.id) &&
                                    <TextButtonWidget onClick={() => onRemove(story.id)}>Deselect</TextButtonWidget>}
                                {!ids.includes(story.id) &&
                                    <SmallButtonWidget onClick={() => onAdd(story.id)}>Select</SmallButtonWidget>}
                            </>
                        ),
                    ]}/>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onClickAdd}>Add story</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}

