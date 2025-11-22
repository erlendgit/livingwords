interface AddQuestionProps {
  questionId: string | null;
  onChange: (value: string) => void;
}

export function AddQuestion({ questionId, onChange }: AddQuestionProps) {
  return (
      <div>
        Deze vraag wordt beantwoord
      </div>
  );
}