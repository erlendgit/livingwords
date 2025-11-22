interface AddNarratorProps {
    narratorId: string | null;
    onChange: (value: string | null) => void;
}

export function AddNarrator({narratorId, onChange}: AddNarratorProps) {
    return (
        <div onChange={() => onChange(narratorId)}>
            Dit is de verteller
        </div>
    );
}