interface ChapterEditorProps {
    chapter: number;
    onChange: (value: number) => void;
}

export function EditChapter({chapter, onChange}: ChapterEditorProps) {
    return (
        <>
            <fieldset>
                <label htmlFor={"chapter-input"}>Chapter
                    <input type={"number"}
                           value={chapter}
                           onChange={(e) => onChange(Number(e.target.value))}
                    />
                </label>

            </fieldset>
        </>
    );
}