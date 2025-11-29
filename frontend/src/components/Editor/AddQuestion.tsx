import {useState} from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {QuestionCard} from "../Question/QuestionCard.tsx";
import {QuestionSelector} from "../Question/QuestionSelector.tsx";

interface AddQuestionProps {
    questionIds: string[];
    onChange: (value: string[]) => void;
}

export function AddQuestion({questionIds, onChange}: AddQuestionProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const startEdit = () => setEdit(true);
    const stopEdit = () => setEdit(false);
    const hasQuestions = questionIds && questionIds.length > 0;

    function handleAdd(id: string) {
        if (questionIds.includes(id)) {
            return;
        }
        onChange([...questionIds, id]);
    }

    function handleRemove(id: string) {
        if (!questionIds.includes(id)) {
            return;
        }
        onChange(questionIds.filter(sid => sid !== id));
    }

    return (
        <div>
            {hasQuestions && (
                <ul>
                    {questionIds.map((id) => (<li key={id}>
                        <QuestionCard questionId={id} />
                        <button onClick={() => handleRemove(id)}>Remove</button>
                    </li>))}
                </ul>
            )}
            <button onClick={startEdit}>Add question</button>
            {edit && (
                <ModalDialogWidget title={"Select question"} onCancel={stopEdit}>
                    <QuestionSelector questionIds={questionIds} onAdd={handleAdd} onRemove={handleRemove} onCancel={stopEdit}/>
                </ModalDialogWidget>
            )}
        </div>
    );
}