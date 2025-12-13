import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import { IntegerInputWidget } from "../../widgets/forms/TextInputWidget.tsx";

interface VerseEditorProps {
    verse: number;
    onChange: (value: number) => void;
}

export function EditVerse({ verse, onChange }: VerseEditorProps) {
    return (
        <FieldsetWidget>
            <IntegerInputWidget
                label={"Verse"}
                value={verse}
                onChange={onChange}
            />
        </FieldsetWidget>
    );
}
