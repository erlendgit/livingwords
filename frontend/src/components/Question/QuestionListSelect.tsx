import {QuestionCardView} from "./QuestionCard.tsx";
import {type Question, useQuestionList} from "../../plugins/api/questions.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";

const QuestionList = ItemTableWidget<Question>;

interface QuestionListSelectProps {
    ids: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onCancel: () => void;
}

export function QuestionListSelect({ids, onAdd, onRemove, onAddNew, onCancel}: QuestionListSelectProps) {
    const {data, isLoading, isError} = useQuestionList();
    const questions = data?.nodes || [];

    const selected = questions.filter((item) => ids.includes(item.id))
    const available = questions.filter((item) => !ids.includes(item.id))

    return (
        <>
            {isLoading && <p>Loading questions...</p>}
            {isError && <p>Error while loading questions!</p>}
            {selected.length > 0 && (
                <QuestionList
                    items={selected}
                    columnCallbacks={[
                        (question: Question) => <QuestionCardView question={question}/>,
                        (question: Question) => <SmallButtonWidget
                            onClick={() => onRemove(question.id)}>Remove</SmallButtonWidget>,
                    ]}
                >
                </QuestionList>
            )}
            {available.length > 0 && (
                <QuestionList
                    items={available}
                    columnCallbacks={[
                        (question: Question) => <QuestionCardView question={question}/>,
                        (question: Question) => <SmallButtonWidget
                            onClick={() => onAdd(question.id)}>Add</SmallButtonWidget>,
                    ]}
                >
                </QuestionList>
            )}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onAddNew}>Create new</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}

