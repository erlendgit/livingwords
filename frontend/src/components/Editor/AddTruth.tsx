interface AddTruthProps {
    truthId: string | null;
    onChange: (value: string | null) => void;
}

export function AddTruth({truthId, onChange}: AddTruthProps) {
    // Hier gaat het om 1 of meer 'waarheden'
    return (
        <div onChange={() => onChange(truthId)}>
            Deze waarheid wordt benadrukt
        </div>
    );
}