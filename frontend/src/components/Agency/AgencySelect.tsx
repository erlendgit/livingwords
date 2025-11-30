import {AgencyCard} from "./AgencyCard.tsx";
import {useState} from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {AgencyListSelect} from "./AgencyListSelect.tsx";
import {AgencyCreateSelect} from "./AgencyCreateSelect.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";

interface AgencySelectProps {
    description: string
    formTitle: string
    buttonLabel: string
    agencyId: string | null
    setAgencyId: (value: string | null) => void
}

export function AgencySelect({
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
        <>
            {agencyId && (
                <>
                    {description}
                    <AgencyCard agencyId={agencyId}/>
                </>
            )}
            <FlexWidget>
                <SmallButtonWidget onClick={handleOpenForm}>{buttonLabel}</SmallButtonWidget>
                {agencyId && <SmallButtonWidget onClick={() => setAgencyId(null)}>Verwijderen</SmallButtonWidget>}
            </FlexWidget>

            {showForm && (
                <ModalDialogWidget title={formTitle} onCancel={handleCloseForm}>
                    {viewMode === 'list' && <AgencyListSelect agencyId={agencyId} onSelect={handleSelect} onCreate={handleSwitchToAdd} onCancel={handleCloseForm}/>}
                    {viewMode === 'add' && <AgencyCreateSelect onSelect={handleSelect} onCancel={handleSwitchToList}/>}
                </ModalDialogWidget>
            )}

        </>
    );
}