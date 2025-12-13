import {type Story, useStoryList} from "../../plugins/api/stories.tsx";
import {StoryCardView} from "./StoryCard.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";
import {useState} from "react";
import {StoryUpdateForm} from "./StoryForm.tsx";

const StoryList = ItemTableWidget<Story>;

interface StoryListSelectProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClickAdd: () => void,
    onClose: () => void,
}

export function StoryListSelect({ids, onAdd, onRemove, onClose, onClickAdd}: StoryListSelectProps) {
    const [editing, setEditing] = useState<Story | null>(null);

    const handleShowList = () => setEditing(null);
    const handleShowEdit = (story: Story) => setEditing(story);

    return (
        <>
            {editing && <StoryUpdateForm story={editing} onClose={handleShowList}/>}
            {!editing &&
                <StoryListSelectTab
                    ids={ids}
                    onAdd={onAdd}
                    onEdit={handleShowEdit}
                    onRemove={onRemove}
                    onClickAdd={onClickAdd}
                    onClose={onClose}/>}
        </>
    )
}

interface StoryListSelectTabProps {
    ids: string[];
    onAdd: (value: string) => void;
    onEdit: (story: Story) => void;
    onRemove: (value: string) => void;
    onClickAdd: () => void;
    onClose: () => void;
}

export function StoryListSelectTab({ids, onAdd, onEdit, onRemove, onClickAdd, onClose}: StoryListSelectTabProps) {
    const {data, isLoading, isError} = useStoryList();
    const stories: Story[] = data?.nodes || [];
    const hasStory: boolean = stories.length > 0

    if (isLoading) {
        return <p>Loading stories...</p>
    }
    if (isError) {
        return <p>Error while loading stories!</p>
    }

    return (
        <>
            {hasStory &&
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
                                <TextButtonWidget onClick={() => onEdit(story)}>Edit</TextButtonWidget>
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

