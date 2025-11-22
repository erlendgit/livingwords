interface AddBystanderProps {
    bystanderId: string | null;
    onChange: (value: string) => void;
}

export function AddBystander({bystanderId, onChange}: AddBystanderProps) {
    return (
        <div>
            Dit is 'de vlieg op de muur'
        </div>
    );
}