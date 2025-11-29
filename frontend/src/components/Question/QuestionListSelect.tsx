import {QuestionCard, QuestionCardView} from "./QuestionCard.tsx";
import {useQuestionList} from "../../plugins/api/questions.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

interface QuestionListSelectProps {
    questionIds: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onDone: () => void;
}

export function QuestionListSelect({questionIds, onAdd, onRemove, onAddNew, onDone}: QuestionListSelectProps) {
    const {data, isLoading, isError} = useQuestionList();
    const questions = (data?.nodes || []).filter(question => !questionIds.includes(question.id));
    const hasQuestions = questionIds && questionIds.length > 0;

    return (
        <>
            {hasQuestions && (
                <ul>
                    {questionIds.map((id) => (
                        <li key={id}>
                            <QuestionCard questionId={id}/>
                            <SmallButtonWidget onClick={() => onRemove(id)}>Remove</SmallButtonWidget>
                        </li>
                    ))}
                </ul>
            )}
            {isLoading && <p>Loading questions...</p>}
            {isError && <p>Error while loading questions!</p>}
            {questions && (
                <ul>
                    {questions.map((question) => (
                        <li key={question.id}>
                            <QuestionCardView question={question}/>
                            <SmallButtonWidget onClick={() => onAdd(question.id)}>Add</SmallButtonWidget>
                        </li>
                    ))}
                </ul>
            )}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onAddNew}>Create new</SmallButtonWidget>
                <SmallButtonWidget onClick={onDone}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}