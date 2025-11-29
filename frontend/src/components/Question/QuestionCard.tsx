import {type Question, useQuestion} from "../../plugins/api/questions.tsx";

interface QuestionCardProps {
    questionId: string
}

interface QuestionCardViewProps {
    question: Question,
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