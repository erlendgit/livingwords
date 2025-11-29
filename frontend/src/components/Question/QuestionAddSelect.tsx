import {useEffect, useState} from "react";
import {useAddQuestion} from "../../plugins/api/questions.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

interface QuestionAddSelectProps {
    onAdd: (value: string) => void;
    onCancel: () => void;
}

export function QuestionAddSelect({onAdd, onCancel}: QuestionAddSelectProps) {
    const {mutate: addQuestion, data, isPending, isError} = useAddQuestion();
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    function handleSave() {
        addQuestion({question, answer});
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onAdd(data?.node.id);
        }
    }, [onAdd, data, isPending, isError]);

    return (
        <>
            <fieldset>
                <input type="text"
                       placeholder="Question..."
                       value={question}
                       onChange={(e) => setQuestion(e.target.value)}/>
                <input type="text"
                       placeholder="Answer..."
                       value={answer}
                       onChange={(e) => setAnswer(e.target.value)}/>
            </fieldset>
            {isPending && <p>Storing the question...</p>}
            {isError && <p>Question could not be stored.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Add new question</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}