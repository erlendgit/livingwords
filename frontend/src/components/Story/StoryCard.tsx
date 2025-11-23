import {type Story, useStory} from "../../api/stories.tsx";

interface StoryCardProps {
    storyId: string
}

interface StoryCardViewProps {
    story: Story,
}

export function StoryCard({storyId}: StoryCardProps) {
    const {data, isLoading, isError, error} = useStory(storyId);
    const story = data?.node

    if (isLoading) return <p>Loading {storyId}...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!story) return <p>Story {storyId} not found</p>;

    return <StoryCardView story={story}/>
}

export function StoryCardView({story}: StoryCardViewProps) {
    return (
        <div>{story.title}</div>
    )
}