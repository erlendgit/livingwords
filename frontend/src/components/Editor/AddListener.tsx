interface AddListenerProps {
    listenerId: string | null;
    onChange: (value: string) => void;
}

export function AddListener({listenerId, onChange}: AddListenerProps) {
    return (
        <div>
            Deze luistert
        </div>
    );
}