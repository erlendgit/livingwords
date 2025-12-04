import {type Story, useStoryList} from "../../plugins/api/stories.tsx";
import {StoryCardView} from "./StoryCard.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
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
    const selected = stories.filter((story) => ids.includes(story.id));
    const unselected = stories.filter((story) => !ids.includes(story.id));

    if (isLoading) {
        return <p>Loading stories...</p>
    }
    if (isError) {
        return <p>Error while loading stories!</p>
    }

    return (
        <>
            {selected.length > 0 &&
                <StoryList
                    items={selected}
                    columnCallbacks={[
                        (story: Story) => <StoryCardView story={story}/>,
                        (story: Story) => (
                            <SmallButtonWidget onClick={() => onRemove(story.id)}>Remove</SmallButtonWidget>
                        ),
                    ]}/>}
            {unselected.length > 0 &&
                <StoryList
                    items={unselected}
                    columnCallbacks={[
                        (story: Story) => <StoryCardView story={story}/>,
                        (story: Story) => (
                            <SmallButtonWidget onClick={() => onAdd(story.id)}>Select</SmallButtonWidget>
                        ),
                    ]}/>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onClickAdd}>Add story</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}

