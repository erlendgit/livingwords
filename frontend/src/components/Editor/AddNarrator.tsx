interface AddNarratorProps {
  narratorId: string | null;
  onChange: (value: string) => void;
}

export function AddNarrator({ narratorId, onChange }: AddNarratorProps) {
  return (
      <div>
        Dit is de verteller
      </div>
  );
}