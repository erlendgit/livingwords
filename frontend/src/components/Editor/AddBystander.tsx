interface AddBystanderProps {
    bystanderId: string | null;
    onChange: (value: string | null) => void;
}

export function AddBystander({bystanderId, onChange}: AddBystanderProps) {
    return (
        <div onChange={() => onChange(bystanderId)}>
            Dit is 'de vlieg op de muur' {bystanderId}
        </div>
    );
}