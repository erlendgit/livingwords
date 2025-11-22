interface AddStoryProps {
    storyId: string | null;
    onChange: (value: string) => void;
}

export function AddStory({storyId, onChange}: AddStoryProps) {
    return (
        <div>
            Dit is het verhaal
        </div>
    );
}