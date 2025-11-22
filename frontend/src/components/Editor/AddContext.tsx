interface AddContextProps {
    contextId: string | null;
    onChange: (value: string | null) => void;
}

export function AddContext({contextId, onChange}: AddContextProps) {
    return (
        <div onChange={() => onChange(contextId)}>
            Dit is de context
        </div>
    );
}