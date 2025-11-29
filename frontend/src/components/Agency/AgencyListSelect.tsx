import {useAgencyList} from "../../plugins/api/agencies.tsx";
import {AgencyCardView} from "./AgencyCard.tsx";

interface AgencyListSelectProps {
    agencyId: string | null;
    onSelect: (value: string | null) => void;
    onCancel: () => void;
    onCreate: () => void;
}

export function AgencyListSelect({agencyId, onSelect, onCreate, onCancel}: AgencyListSelectProps) {
    const {data, isLoading, isError, error} = useAgencyList();
    const agencies = data?.nodes || [];
    const hasAgencies = agencies.length > 0;

    return (
        <>
            <div>
                {hasAgencies && (
                    <ul>
                        {agencies.map((agency) => (
                            <li>
                                <AgencyCardView agency={agency}/>
                                {agencyId !== agency.id && <button onClick={() => onSelect(agency.id)}>Select</button>}
                                {agencyId === agency.id && <button onClick={() => onSelect(null)}>Deselect</button>}
                            </li>
                        ))}
                    </ul>
                )}
                {!hasAgencies && <p>No agencies available.</p>}
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {(error as Error).message}</p>}
            </div>
            <div className={"grid"}>
                <button onClick={onCreate}>Create new agency</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
}