interface StoryAddFormProps {
    onSave: (value: string) => void,
    onClose: () => void,
}

export function StoryAddForm({onSave, onClose}: StoryAddFormProps) {
    return <>
        Add form.
        <button onClick={() => onSave("id")}>Save</button>
        <button onClick={onClose}>Cancel</button>
    </>
}
