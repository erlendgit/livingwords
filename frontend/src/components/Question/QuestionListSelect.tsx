import {QuestionCard, QuestionCardView} from "./QuestionCard.tsx";
import {useQuestionList} from "../../plugins/api/questions.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

interface QuestionListSelectProps {
    ids: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onCancel: () => void;
}

export function QuestionListSelect({ids, onAdd, onRemove, onAddNew, onCancel}: QuestionListSelectProps) {
    const {data, isLoading, isError} = useQuestionList();
    const questions = (data?.nodes || []).filter(question => !ids.includes(question.id));
    const hasQuestions = ids && ids.length > 0;

    // TODO: moet eigenlijk een table worden.
    return (
        <>
            {hasQuestions && (
                <ul>
                    {ids.map((id) => (
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
                <SmallButtonWidget onClick={onCancel}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}