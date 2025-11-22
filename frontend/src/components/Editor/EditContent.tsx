interface ContentEditorProps {
    content: string;
    onChange: (newContent: string) => void;
}

export function EditContent({content, onChange}: ContentEditorProps) {
    return (
        <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content here..."
            rows={2}
            cols={50}/>
    );
}