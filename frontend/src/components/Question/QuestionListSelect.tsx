import { QuestionCardView } from "./QuestionCard.tsx";
import {
    type Question,
    useQuestionList,
} from "../../plugins/api/questions.tsx";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import { DialogActionsWidget } from "../../widgets/containers/ModalDialogWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";
import { useState } from "react";
import { QuestionUpdateForm } from "./QuestionForm.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";

const QuestionList = ItemTableWidget<Question>;

interface QuestionListSelectProps {
    ids: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onCancel: () => void;
}

export function QuestionListSelect({
    ids,
    onAdd,
    onRemove,
    onAddNew,
    onCancel,
}: QuestionListSelectProps) {
    const [editing, setEditing] = useState<Question | null>(null);

    const handleShowList = () => setEditing(null);
    const handleShowEdit = (question: Question) => setEditing(question);

    return (
        <>
            {editing && (
                <QuestionUpdateForm
                    question={editing}
                    onClose={handleShowList}
                />
            )}
            {!editing && (
                <QuestionListSelectTab
                    ids={ids}
                    onAdd={onAdd}
                    onEdit={handleShowEdit}
                    onRemove={onRemove}
                    onAddNew={onAddNew}
                    onCancel={onCancel}
                />
            )}
        </>
    );
}

interface QuestionListSelectTabProps extends QuestionListSelectProps {
    onEdit: (question: Question) => void;
}

export function QuestionListSelectTab({
    ids,
    onAdd,
    onEdit,
    onRemove,
    onAddNew,
    onCancel,
}: QuestionListSelectTabProps) {
    const { data, isLoading, isError } = useQuestionList();
    const questions = data?.nodes || [];

    return (
        <>
            {isLoading && <p>Loading questions...</p>}
            {isError && <p>Error while loading questions!</p>}
            {questions.length > 0 && (
                <QuestionList
                    items={questions}
                    columnCallbacks={[
                        (question: Question) => (
                            <QuestionCardView question={question} />
                        ),
                        (question: Question) => (
                            <FlexWidget>
                                {ids.includes(question.id) && (
                                    <TextButtonWidget
                                        onClick={() => onRemove(question.id)}
                                    >
                                        Deselect
                                    </TextButtonWidget>
                                )}
                                {!ids.includes(question.id) && (
                                    <SmallButtonWidget
                                        onClick={() => onAdd(question.id)}
                                    >
                                        Select
                                    </SmallButtonWidget>
                                )}
                                <TextButtonWidget
                                    onClick={() => onEdit(question)}
                                >
                                    Edit
                                </TextButtonWidget>
                            </FlexWidget>
                        ),
                    ]}
                ></QuestionList>
            )}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onAddNew}>
                    Create new
                </SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}
