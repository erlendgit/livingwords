import {QuestionCardView} from "./QuestionCard.tsx";
import {type Question, useQuestionList} from "../../plugins/api/questions.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
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

    return (
        <>
            {isLoading && <p>Loading questions...</p>}
            {isError && <p>Error while loading questions!</p>}
            {questions.length > 0 && (
                <QuestionList
                    items={questions}
                    columnCallbacks={[
                        (question: Question) => <QuestionCardView question={question}/>,
                        (question: Question) => (
                            <>
                                {ids.includes(question.id) &&
                                    <TextButtonWidget onClick={() => onRemove(question.id)}>Remove</TextButtonWidget>}
                                {!ids.includes(question.id) &&
                                    <SmallButtonWidget onClick={() => onAdd(question.id)}>Select</SmallButtonWidget>}
                            </>
                        ),
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

