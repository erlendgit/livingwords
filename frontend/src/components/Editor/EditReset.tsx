import { useResetLivingWord } from "../../plugins/api/words.tsx";
import { ButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";

interface ResetProps {
    bookId: string;
    chapter: number;
    verse: number;
}

export function EditReset(props: ResetProps) {
    const { bookId, chapter, verse } = props;
    const { mutate, isPending } = useResetLivingWord();

    const handleReset = () => {
        mutate({
            bookId,
            chapter,
            verse,
        });
    };

    return (
        <ButtonWidget
            onClick={handleReset}
            disabled={isPending}
            color={"warning"}
        >
            Reset
        </ButtonWidget>
    );
}
