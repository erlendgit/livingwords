import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import { MultilineTextInputWidget } from "../../widgets/forms/TextInputWidget.tsx";

interface ContentEditorProps {
    content: string;
    title: string;
    onChange: (newContent: string) => void;
}

export function EditContent({ content, title, onChange }: ContentEditorProps) {
    return (
        <FieldsetWidget>
            <MultilineTextInputWidget
                value={content}
                onChange={(e) => onChange(e.target.value)}
                label={title}
                rows={3}
            />
        </FieldsetWidget>
    );
}
