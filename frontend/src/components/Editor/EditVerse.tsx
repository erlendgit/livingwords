interface VerseEditorProps {
    verse: number;
    onChange: (value: number) => void;
}

export function EditVerse({verse, onChange}: VerseEditorProps) {
    return (
        <>
            <fieldset>
                <label htmlFor={"chapter-input"}>
                    Verse
                    <input type={"number"}
                           value={verse}
                           onChange={(e) => onChange(Number(e.target.value))}/>
                </label>
            </fieldset>
        </>
    );
}