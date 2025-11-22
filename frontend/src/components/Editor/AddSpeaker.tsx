interface AddSpeakerProps {
    speakerId: string | null;
    onChange: (value: string | null) => void;
}

export function AddSpeaker({speakerId, onChange}: AddSpeakerProps) {
    return (
        <div onChange={() => onChange(speakerId)}>
            Dit is de spreker
        </div>
    );
}