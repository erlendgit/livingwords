import {useEffect, useState} from "react";
import {type Agency, type AgencyPayload, useAddAgency, useUpdateAgency} from "../../plugins/api/agencies.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";

interface AgencyCreateSelectProps {
    onSelect: (value: string) => void;
    onCancel: () => void;
}

export function AgencyCreateSelect({onSelect, onCancel}: AgencyCreateSelectProps) {
    const {mutate: addAgency, data, isPending, isError} = useAddAgency()
    const newAgencyId = data?.node?.id;

    function handleSave(agency: AgencyPayload) {
        addAgency(agency)
    }

    useEffect(() => {
        if (newAgencyId && !isPending && !isError) {
            onSelect(newAgencyId);
            onCancel();
        }
    }, [newAgencyId, isPending, isError, onSelect, onCancel]);

    return (
        <AgencyForm onSave={handleSave} onCancel={onCancel}>
            {isPending && <p>Is storing...</p>}
            {isError && <p>An error occured! Try again later.</p>}
        </AgencyForm>
    );
}

interface AgencyUpdateSelectProps {
    agency: Agency;
    onCancel: () => void;
}

export function AgencyUpdateSelect({agency, onCancel}: AgencyUpdateSelectProps) {
    const {mutate: updateAgency, data, isPending, isError} = useUpdateAgency(agency.id)
    const updatedAgencyId = data?.node?.id;

    function handleSave(updatedAgency: AgencyPayload) {
        updateAgency(updatedAgency)
    }

    useEffect(() => {
        if (updatedAgencyId && !isPending && !isError) {
            onCancel();
        }
    }, [updatedAgencyId, isPending, isError, onCancel]);

    return (
        <AgencyForm agency={agency} onSave={handleSave} onCancel={onCancel}>
            {isPending && <p>Is storing...</p>}
            {isError && <p>An error occured! Try again later.</p>}
        </AgencyForm>
    )
}

interface AgencyFormProps {
    agency?: Agency;
    onSave: (agency: AgencyPayload) => void;
    onCancel: () => void;
    children?: React.ReactNode;
}

export function AgencyForm({agency, onSave, onCancel, children}: AgencyFormProps) {
    const [description, setDescription] = useState<string>(() => agency?.description || "");

    function handleSave() {
        onSave({
            description,
        });
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label={"Description"}
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}/>
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}