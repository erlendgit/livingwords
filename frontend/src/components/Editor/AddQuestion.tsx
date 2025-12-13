import { useState } from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import { QuestionCard } from "../Question/QuestionCard.tsx";
import { QuestionSelector } from "../Question/QuestionSelector.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";

const QuestionIdList = ItemTableWidget<string>;

interface AddQuestionProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddQuestion({
    ids,
    onAdd,
    onRemove,
    onClear,
}: AddQuestionProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const hasQuestions = ids.length > 0;

    const handleOpenModal = () => setEdit(true);
    const handleCloseModal = () => setEdit(false);

    return (
        <SpaceWidget>
            {hasQuestions && (
                <QuestionIdList
                    items={ids}
                    columnCallbacks={[
                        (id: string) => <QuestionCard questionId={id} />,
                        (id: string) => (
                            <TextButtonWidget onClick={() => onRemove(id)}>
                                Deselect
                            </TextButtonWidget>
                        ),
                    ]}
                />
            )}
            <FlexWidget>
                <SmallButtonWidget onClick={handleOpenModal}>
                    Add question
                </SmallButtonWidget>
                {hasQuestions && (
                    <SmallButtonWidget onClick={onClear}>
                        Clear value
                    </SmallButtonWidget>
                )}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget
                    title={"Select question"}
                    onCancel={handleCloseModal}
                >
                    <QuestionSelector
                        ids={ids}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onCancel={handleCloseModal}
                    />
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}
