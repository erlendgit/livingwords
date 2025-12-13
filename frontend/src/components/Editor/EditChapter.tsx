import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import { IntegerInputWidget } from "../../widgets/forms/TextInputWidget.tsx";

interface ChapterEditorProps {
    chapter: number;
    onChange: (value: number) => void;
}

export function EditChapter({ chapter, onChange }: ChapterEditorProps) {
    return (
        <FieldsetWidget>
            <IntegerInputWidget
                label={"Chapter"}
                value={chapter}
                onChange={onChange}
            />
        </FieldsetWidget>
    );
}
