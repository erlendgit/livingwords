interface AddQuestionProps {
    questionId: string | null;
    onChange: (value: string | null) => void;
}

export function AddQuestion({questionId, onChange}: AddQuestionProps) {
    // Hier gaat het om 1 of meer 'vragen'
    return (
        <div onChange={() => onChange(questionId)}>
            Deze vraag wordt beantwoord
        </div>
    );
}