import { type Truth, useTruth } from "../../plugins/api/truths.tsx";

interface TruthCardProps {
    truthId: string;
}

interface TruthCardViewProps {
    truth: Truth;
}

export function TruthCard({ truthId }: TruthCardProps) {
    const { data, isLoading, isError, error } = useTruth(truthId);
    const truth = data?.node;

    if (isLoading) return <p>Loading {truthId}...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!truth) return <p>Truth {truthId} not found</p>;

    return <TruthCardView truth={truth} />;
}

export function TruthCardView({ truth }: TruthCardViewProps) {
    return <div>{truth.statement}</div>;
}
