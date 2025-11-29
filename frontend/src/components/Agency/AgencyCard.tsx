import {type Agency, useAgency} from "../../plugins/api/agencies.tsx";

interface AgencyCardProps {
    agencyId: string;
}

interface AgencyCardViewProps {
    agency: Agency;
}

export function AgencyCard({agencyId}: AgencyCardProps) {
    const {data, isLoading, isError, error} = useAgency(agencyId);
    const agency = data?.node;

    if (isLoading) return <p>Loading…</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!agency) return <p>No agency found.</p>;

    return (
        <AgencyCardView agency={agency}/>
    );
}

export function AgencyCardView({agency}: AgencyCardViewProps) {
    return (
        <div>{agency.description}</div>
    );
}