interface AddQuestionProps {
    questionId: string | null;
    onChange: (value: string | null) => void;
}

export function AddQuestion({questionId, onChange}: AddQuestionProps) {
    return (
        <div onChange={() => onChange(questionId)}>
            Deze vraag wordt beantwoord
        </div>
    );
}