import {type Agency, useAgencyList} from "../../plugins/api/agencies.tsx";
import {AgencyCardView} from "./AgencyCard.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";
import {useState} from "react";
import {AgencyUpdateSelect} from "./AgencyForm.tsx";

const AgencyList = ItemTableWidget<Agency>;

interface AgencyListSelectProps {
    agencyId: string | null;
    onSelect: (value: string | null) => void;
    onCancel: () => void;
    onCreate: () => void;
}

export function AgencyListSelect({agencyId, onSelect, onCreate, onCancel}: AgencyListSelectProps) {
    const [editing, setEditing] = useState<Agency | null>(null);

    const handleShowList = () => setEditing(null);
    const handleShowEdit = (agency: Agency) => setEditing(agency);

    return (
        <>
            {editing &&
                <AgencyUpdateSelect
                    agency={editing}
                    onCancel={handleShowList}/>}
            {!editing &&
                <AgencyListSelectTab
                    agencyId={agencyId}
                    onSelect={onSelect}
                    onCreate={onCreate}
                    onEdit={handleShowEdit}
                    onCancel={onCancel}/>}
        </>
    )
}

interface AgencyListSelectTabProps {
    agencyId: string | null;
    onSelect: (value: string | null) => void;
    onCreate: () => void;
    onEdit: (agency: Agency) => void;
    onCancel: () => void;
}

export function AgencyListSelectTab({agencyId, onSelect, onCreate, onEdit, onCancel}: AgencyListSelectTabProps) {
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
                            <>
                                {agencyId !== agency.id ?
                                    <SmallButtonWidget onClick={() => onSelect(agency.id)}>Select</SmallButtonWidget> :
                                    <TextButtonWidget onClick={() => onSelect(null)}>Remove</TextButtonWidget>}
                                <TextButtonWidget onClick={() => onEdit(agency)}>Edit</TextButtonWidget>
                            </>
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