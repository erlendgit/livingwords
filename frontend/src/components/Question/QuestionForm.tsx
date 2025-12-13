import {useEffect, useState} from "react";
import {
    type QuestionPayload,
    type Question,
    useAddQuestion,
    useUpdateQuestion
} from "../../plugins/api/questions.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";

interface QuestionAddSelectProps {
    onSave: (value: string) => void;
    onCancel: () => void;
}

export function QuestionAddSelect({onSave, onCancel}: QuestionAddSelectProps) {
    const {mutate: addQuestion, data, isPending, isError} = useAddQuestion();

    function handleSave(value: QuestionPayload) {
        addQuestion(value);
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onSave(data?.node.id);
        }
    }, [onSave, data, isPending, isError]);

    return (
        <QuestionForm onSave={handleSave} onCancel={onCancel}>
            {isPending && <p>Storing the question...</p>}
            {isError && <p>Question could not be stored.</p>}
        </QuestionForm>
    )
}

interface QuestionUpdateFormProps {
    question: Question,
    onClose: () => void,
}

export function QuestionUpdateForm({question, onClose}: QuestionUpdateFormProps) {
    const {mutate: updateQuestion, data, isPending, isError} = useUpdateQuestion(question.id);

    function handleSave(value: QuestionPayload) {
        updateQuestion(value);
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onClose();
        }
    }, [data, isPending, isError, onClose]);

    return (
        <QuestionForm question={question} onSave={handleSave} onCancel={onClose}>
            {isPending && <p>Updating the question...</p>}
            {isError && <p>Question could not be updated.</p>}
        </QuestionForm>
    )
}

interface QuestionFormProps {
    question?: Question
    onSave: (value: QuestionPayload) => void;
    onCancel: () => void;
    children?: React.ReactNode;
}

function QuestionForm({question, onSave, onCancel, children}: QuestionFormProps) {
    const [text, setText] = useState<string>(question?.question || "");
    const [answer, setAnswer] = useState<string>(question?.answer || "");

    function handleSave() {
        onSave({
            question: text,
            answer: answer,
        });
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label="Question"
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}/>
                <MultilineTextInputWidget
                    label="Answer"
                    rows={2}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}/>
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Add new question</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}