interface AddSpeakerProps {
    speakerId: string | null;
    onChange: (value: string) => void;
}

export function AddSpeaker({speakerId, onChange}: AddSpeakerProps) {
    return (
        <div>
            Dit is de spreker
        </div>
    );
}