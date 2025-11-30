import {type Story, useStoryList} from "../../plugins/api/stories.tsx";
import {StoryCardView} from "./StoryCard.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

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
    const hasStories: boolean = !!(stories && stories.length > 0)

    if (isLoading) {
        return <p>Loading stories...</p>
    }
    if (isError) {
        return <p>Error while loading stories!</p>
    }

    // filter out already selected stories in "ids"
    const selected = stories.filter((story) => ids.includes(story.id));
    const unselected = stories.filter((story) => !ids.includes(story.id));

    return (
        <>
            {hasStories &&
                <table>
                    {selected?.map((story) => (
                        <tr>
                            <td style={{width: "100%"}}>
                                <StoryCardView story={story}/>
                            </td>
                            <td>
                                <SmallButtonWidget onClick={() => onRemove(story.id)}>Remove</SmallButtonWidget>)
                            </td>
                        </tr>
                    ))}
                    {unselected?.map((story) => (
                        <tr>
                            <td style={{width: "100%"}}>
                                <StoryCardView story={story}/>
                            </td>
                            <td>
                                <SmallButtonWidget onClick={() => onAdd(story.id)}>Select</SmallButtonWidget>
                            </td>
                        </tr>
                    ))}
                </table>
            }
            {!hasStories && <p>No stories found yet.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onClickAdd}>Add story</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}

