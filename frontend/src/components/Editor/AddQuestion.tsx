import {useState} from "react";
import {ModalDialog} from "../../layouts/ModalDialog.tsx";
import {QuestionCardMultiple} from "../Question/QuestionCard.tsx";
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

    return (
        <>
            {hasQuestions && <QuestionCardMultiple questionIds={questionIds}/>}
            <div role={"group"}>
                <button onClick={startEdit}>Select question</button>
                {hasQuestions && <button onClick={() => onChange([])}>Wis vragen</button>}
            </div>
            {edit && (
                <ModalDialog title={"Select question"} onCancel={stopEdit}>
                    <QuestionSelector questionIds={questionIds} onChange={onChange} onCancel={stopEdit}/>
                </ModalDialog>
            )}
        </>
    );
}