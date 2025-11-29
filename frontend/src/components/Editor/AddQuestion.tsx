import {useState} from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {QuestionCard} from "../Question/QuestionCard.tsx";
import {QuestionSelector} from "../Question/QuestionSelector.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";

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
        <SpaceWidget>
            {hasQuestions && (
                <ul>
                    {questionIds.map((id) => (<li key={id}>
                        <QuestionCard questionId={id} />
                        <SmallButtonWidget onClick={() => handleRemove(id)}>Remove</SmallButtonWidget>
                    </li>))}
                </ul>
            )}
            <SmallButtonWidget onClick={startEdit}>Add question</SmallButtonWidget>
            {edit && (
                <ModalDialogWidget title={"Select question"} onCancel={stopEdit}>
                    <QuestionSelector questionIds={questionIds} onAdd={handleAdd} onRemove={handleRemove} onCancel={stopEdit}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}