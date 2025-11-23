interface StoryAddFormProps {
    onSave: (value: string) => void,
    onClose: () => void,
}

export function StoryAddForm({onSave, onClose}: StoryAddFormProps) {
    return <>
        Add form.
        <div className={"grid"}>
            <button onClick={() => onSave("id")}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </>
}
