import {type Truth, useTruth} from "../../api/truths.tsx";

interface TruthCardMultipleProps {
    truthIds: string[] | null
}

interface TruthCardProps {
    truthId: string
}

interface TruthCardViewProps {
    truth: Truth,
}


export function TruthCardMultiple({truthIds}: TruthCardMultipleProps) {
    if (!truthIds || truthIds.length === 0) {
        return null;
    }

    if (truthIds.length === 1) {
        return <TruthCard truthId={truthIds[0]}/>;
    }

    return (
        <ul>
            {truthIds.map((id) => (
                <li key={id}>
                    <TruthCard truthId={id}/>
                </li>
            ))}
        </ul>
    );
}

export function TruthCard({truthId}: TruthCardProps) {
    const {data, isLoading, isError, error} = useTruth(truthId);
    const truth = data?.node;

    if (isLoading) return <p>Loading {truthId}...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!truth) return <p>Truth {truthId} not found</p>;

    return <TruthCardView truth={truth}/>;
}

export function TruthCardView({truth}: TruthCardViewProps) {
    return (
        <div>{truth.statement}</div>
    );
}