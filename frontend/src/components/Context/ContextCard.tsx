import {type Context, useContext} from "../../plugins/api/contexts.tsx";

interface ContextCardProps {
    contextId: string
}

interface ContextCardViewProps {
    context: Context,
}

export function ContextCard({contextId}: ContextCardProps) {
    const {data, isLoading, isError, error} = useContext(contextId);
    const context = data?.node

    if (isLoading) return <p>Loading {contextId}...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!context) return <p>Story {contextId} not found</p>;

    return <ContextCardView context={context}/>
}

export function ContextCardView({context}: ContextCardViewProps) {
    return (
        <div>{context.description}</div>
    )
}