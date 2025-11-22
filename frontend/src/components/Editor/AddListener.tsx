interface AddListenerProps {
    listenerId: string | null;
    onChange: (value: string | null) => void;
}

export function AddListener({listenerId, onChange}: AddListenerProps) {
    return (
        <div onChange={() => onChange(listenerId)}>
            Deze luistert
        </div>
    );
}