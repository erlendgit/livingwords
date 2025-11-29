import {type Story, useStoryList} from "../../plugins/api/stories.tsx";
import {StoryCardView} from "./StoryCard.tsx";

interface StoryListSelectProps {
    storyId: string | null,
    onChange: (value: string) => void,
    onClickAdd: () => void,
    onClose: () => void,
}

export function StoryListSelect({storyId, onChange, onClose, onClickAdd}: StoryListSelectProps) {
    const {data, isLoading, isError} = useStoryList();
    const stories: Story[] | undefined = data?.nodes
    const hasStories: boolean = !!(stories && stories.length > 0)

    if (isLoading) {
        return <p>Loading stories...</p>
    }
    if (isError) {
        return <p>Error while loading stories!</p>
    }

    return (
        <>
            {hasStories &&
                <table>
                    {stories?.map((story) => (
                        <tr>
                            <td style={{width: "100%"}}>
                                <StoryCardView story={story}/>
                            </td>
                            <td>
                                {story.id !== storyId && (<button onClick={() => onChange(story.id)}>Select</button>)}
                            </td>
                        </tr>
                    ))}
                </table>
            }
            {!hasStories && <p>No stories found yet.</p>}
            <div className={"grid"}>
                <button onClick={onClickAdd}>Add story</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </>
    );
}

