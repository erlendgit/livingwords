interface AddContextProps {
    contextId: string | null;
    onChange: (value: string) => void;
}

export function AddContext({contextId, onChange}: AddContextProps) {
    return (
        <div>
            Dit is de context
        </div>
    );
}