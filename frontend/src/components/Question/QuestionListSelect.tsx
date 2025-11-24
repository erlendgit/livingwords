import {QuestionCard, QuestionCardView} from "./QuestionCard.tsx";
import {useQuestionList} from "../../api/questions.tsx";

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
                            <button onClick={() => onRemove(id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <hr/>
            {isLoading && <p>Loading questions...</p>}
            {isError && <p>Error while loading questions!</p>}
            {questions && (
                <ul>
                    {questions.map((question) => (
                        <li key={question.id}>
                            <QuestionCardView question={question}/>
                            <button onClick={() => onAdd(question.id)}>Add</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className={"grid"}>
                <button onClick={onAddNew}>Create new</button>
                <button onClick={onDone}>Done</button>
            </div>
        </>
    );
}