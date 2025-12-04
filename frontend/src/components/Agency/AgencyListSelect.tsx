import {type Agency, useAgencyList} from "../../plugins/api/agencies.tsx";
import {AgencyCardView} from "./AgencyCard.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";

const AgencyList = ItemTableWidget<Agency>;

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
            {hasAgencies && (
                <AgencyList
                    items={agencies}
                    columnCallbacks={[
                        (agency: Agency) => <AgencyCardView agency={agency}/>,
                        (agency: Agency) => (
                            agencyId !== agency.id ?
                                <SmallButtonWidget onClick={() => onSelect(agency.id)}>Select</SmallButtonWidget> :
                                <TextButtonWidget onClick={() => onSelect(null)}>Remove</TextButtonWidget>
                        ),
                    ]}/>
            )}
            {!hasAgencies && <p>No agencies available.</p>}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {(error as Error).message}</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onCreate}>Create new agency</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}