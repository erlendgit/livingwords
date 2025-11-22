interface AddTruthProps {
    truthId: string | null;
    onChange: (value: string | null) => void;
}

export function AddTruth({truthId, onChange}: AddTruthProps) {
    return (
        <div onChange={() => onChange(truthId)}>
            Deze waarheid wordt benadrukt
        </div>
    );
}