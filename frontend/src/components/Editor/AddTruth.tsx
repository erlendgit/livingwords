interface AddTruthProps {
    truthId: string | null;
    onChange: (value: string) => void;
}

export function AddTruth({truthId, onChange}: AddTruthProps) {
    return (
        <div>
            Deze waarheid wordt benadrukt
        </div>
    );
}