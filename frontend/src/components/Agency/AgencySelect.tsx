import {AgencyCard} from "./AgencyCard.tsx";
import {useState} from "react";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {AgencyListSelect} from "./AgencyListSelect.tsx";
import {AgencyCreateSelect} from "./AgencyForm.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";

interface AgencySelectProps {
    description: string
    formTitle: string
    buttonLabel: string
    agencyId: string | null
    setAgencyId: (value: string | null) => void
}

export function AgencySelect(props: AgencySelectProps) {
    const {description, formTitle, buttonLabel} = props;
    const {agencyId, setAgencyId} = props;
    const [showForm, setShowForm] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'add'>('list');
    const handleOpenForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);
    const handleSwitchToAdd = () => setViewMode('add');
    const handleSwitchToList = () => setViewMode('list');

    function handleSelect(agencyId: string | null) {
        setAgencyId(agencyId);
        handleSwitchToList();
        if (agencyId) {
            handleCloseForm();
        }
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
                {agencyId && <SmallButtonWidget onClick={() => setAgencyId(null)}>Clear value</SmallButtonWidget>}
            </FlexWidget>

            {showForm && (
                <ModalDialogWidget title={formTitle} onCancel={handleCloseForm}>
                    {viewMode === 'list' &&
                        <AgencyListSelect agencyId={agencyId} onSelect={handleSelect} onCreate={handleSwitchToAdd}
                                          onCancel={handleCloseForm}/>}
                    {viewMode === 'add' && <AgencyCreateSelect onSelect={handleSelect} onCancel={handleSwitchToList}/>}
                </ModalDialogWidget>
            )}

        </>
    );
}