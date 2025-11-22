interface StorySelectListProps {
    storyId: string | null,
    onChange: (value: string | null) => void
}

export function StorySelectList({storyId, onChange}: StorySelectListProps) {
    return (
        <div>
            <p><strong>Story select list</strong></p>
            <ul>
                <li>{storyId && <p>{storyId}
                    <button onClick={() => onChange(storyId)}>Select</button>
                </p>}</li>

            </ul>
        </div>
    );
}