import {AgencyCard} from "./AgencyCard.tsx";
import {useState} from "react";
import {ModalDialog} from "../../layouts/ModalDialog.tsx";
import {AgencyListSelect} from "./AgencyListSelect.tsx";
import {AgencyCreateSelect} from "./AgencyCreateSelect.tsx";

interface AgencySelectProps {
    agencyType: string
    description: string
    formTitle: string
    buttonLabel: string
    agencyId: string | null
    setAgencyId: (value: string | null) => void
}

export function AgencySelect({
                                 agencyType,
                                 description,
                                 formTitle,
                                 buttonLabel,
                                 agencyId,
                                 setAgencyId
                             }: AgencySelectProps) {
    const [showForm, setShowForm] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'add'>('list');
    const handleOpenForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);
    const handleSwitchToAdd = () => setViewMode('add');
    const handleSwitchToList = () => setViewMode('list');

    function handleSelect(agencyId: string|null) {
        setAgencyId(agencyId);
        handleSwitchToList();
        handleCloseForm();
    }

    return (
        <div>
            {agencyId && (
                <>
                    {description}
                    <AgencyCard agencyId={agencyId}/>
                </>
            )}
            <button onClick={handleOpenForm}>{buttonLabel}</button>
            {agencyId && <button onClick={() => setAgencyId(null)}>Verwijderen</button>}

            {showForm && (
                <ModalDialog title={formTitle} onCancel={handleCloseForm}>
                    {viewMode === 'list' && <AgencyListSelect agencyId={agencyId} onSelect={handleSelect} onCreate={handleSwitchToAdd} onCancel={handleCloseForm}/>}
                    {viewMode === 'add' && <AgencyCreateSelect role={agencyType} onSelect={handleSelect} onCancel={handleSwitchToList}/>}
                </ModalDialog>
            )}

        </div>
    );
}