import {useState} from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {QuestionCard} from "../Question/QuestionCard.tsx";
import {QuestionSelector} from "../Question/QuestionSelector.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";

interface AddQuestionProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddQuestion({ids, onAdd, onRemove, onClear}: AddQuestionProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const startEdit = () => setEdit(true);
    const stopEdit = () => setEdit(false);
    const hasQuestions = ids && ids.length > 0;

    return (
        <SpaceWidget>
            {hasQuestions && (
                <ul>
                    {ids.map((id) => (<li key={id}>
                        <QuestionCard questionId={id}/>
                        <SmallButtonWidget onClick={() => onRemove(id)}>Remove</SmallButtonWidget>
                    </li>))}
                </ul>
            )}
            <FlexWidget>
                <SmallButtonWidget onClick={startEdit}>Add question</SmallButtonWidget>
                {hasQuestions && (
                    <SmallButtonWidget onClick={onClear}>Clear all</SmallButtonWidget>
                )}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget title={"Select question"} onCancel={stopEdit}>
                    <QuestionSelector ids={ids} onAdd={onAdd} onRemove={onRemove}
                                      onCancel={stopEdit}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}