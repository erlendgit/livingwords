import {type Question, useQuestion} from "../../api/questions.tsx";

interface QuestionCardMultipleProps {
    questionIds: string[] | null
}

interface QuestionCardProps {
    questionId: string
}

interface QuestionCardViewProps {
    question: Question,
}


export function QuestionCardMultiple({questionIds}: QuestionCardMultipleProps) {
    if (!questionIds || questionIds.length === 0) {
        return null;
    }

    if (questionIds.length === 1) {
        return <QuestionCard questionId={questionIds[0]}/>;
    }

    return (
        <ul>
            {questionIds.map((id) => (
                <li key={id}>
                    <QuestionCard questionId={id}/>
                </li>
            ))}
        </ul>
    );
}

export function QuestionCard({questionId}: QuestionCardProps) {
    const {data, isLoading, isError, error} = useQuestion(questionId);
    const question = data?.node;

    if (isLoading) return <p>Loading question...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!question) return <p>Question not found</p>;

    return <QuestionCardView question={question}/>;
}

export function QuestionCardView({question}: QuestionCardViewProps) {
    return (
        <div>{question.question}</div>
    );
}