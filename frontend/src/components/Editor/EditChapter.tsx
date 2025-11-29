import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";

interface ChapterEditorProps {
    chapter: number;
    onChange: (value: number) => void;
}

export function EditChapter({chapter, onChange}: ChapterEditorProps) {
    return (
        <FieldsetWidget>
            <label htmlFor={"chapter-input"}>Chapter
                <input type={"number"}
                       value={chapter}
                       onChange={(e) => onChange(Number(e.target.value))}
                />
            </label>
        </FieldsetWidget>
    );
}