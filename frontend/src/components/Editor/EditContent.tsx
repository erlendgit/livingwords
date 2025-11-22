interface ContentEditorProps {
    content: string;
    title: string;
    onChange: (newContent: string) => void;
}

export function EditContent({content, title, onChange}: ContentEditorProps) {
    return (
        <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={title}
            rows={2}
            cols={50}/>
    );
}