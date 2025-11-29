import {useAgencyList} from "../../plugins/api/agencies.tsx";
import {AgencyCardView} from "./AgencyCard.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

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
                                {agencyId !== agency.id && <SmallButtonWidget onClick={() => onSelect(agency.id)}>Select</SmallButtonWidget>}
                                {agencyId === agency.id && <SmallButtonWidget onClick={() => onSelect(null)}>Deselect</SmallButtonWidget>}
                            </li>
                        ))}
                    </ul>
                )}
                {!hasAgencies && <p>No agencies available.</p>}
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {(error as Error).message}</p>}
            </div>
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onCreate}>Create new agency</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}