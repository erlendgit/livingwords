import { useEffect, useState } from "react";
import {
    type Agency,
    type AgencyPayload,
    useAddAgency,
    useUpdateAgency,
} from "../../plugins/api/agencies.tsx";
import { SmallButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";
import { DialogActionsWidget } from "../../widgets/containers/ModalDialogWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import { MultilineTextInputWidget } from "../../widgets/forms/TextInputWidget.tsx";
import type { Person } from "../../plugins/api/persons.tsx";
import useListState from "../../plugins/ListState.tsx";
import { PersonCardDeck } from "./PersonCard.tsx";
import { PersonListSelect } from "./PersonListSelect.tsx";
import { AddPersonFormSelect, UpdatePersonForm } from "./PersonForm.tsx";

interface AgencyCreateSelectProps {
    onSelect: (value: string) => void;
    onCancel: () => void;
}

export function AgencyCreateSelect({
    onSelect,
    onCancel,
}: AgencyCreateSelectProps) {
    const { mutate: addAgency, data, isPending, isError } = useAddAgency();
    const newAgencyId = data?.node?.id;

    function handleSave(agency: AgencyPayload) {
        addAgency(agency);
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

export function AgencyUpdateSelect({
    agency,
    onCancel,
}: AgencyUpdateSelectProps) {
    const {
        mutate: updateAgency,
        data,
        isPending,
        isError,
    } = useUpdateAgency(agency.id);
    const updatedAgencyId = data?.node?.id;

    function handleSave(updatedAgency: AgencyPayload) {
        updateAgency(updatedAgency);
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
    );
}

interface AgencyFormProps {
    agency?: Agency;
    onSave: (agency: AgencyPayload) => void;
    onCancel: () => void;
    children?: React.ReactNode;
}

interface PersonFormState {
    mode: "create" | "update";
    editing?: Person;
}

export function AgencyForm({
    agency,
    onSave,
    onCancel,
    children,
}: AgencyFormProps) {
    const [formState, setFormState] = useState<PersonFormState>();
    const [description, setDescription] = useState<string>(
        () => agency?.description || "",
    );
    const [personIds, addPersonId, removePersonId] = useListState<string>(
        agency?.persons.map((p) => p.id) || [],
    );

    const handleShowAgencyForm = () => setFormState(undefined);
    const handleShowAddPersonform = () => setFormState({ mode: "create" });
    const handleShowEditPersonForm = (person: Person) =>
        setFormState({ mode: "update", editing: person });

    function handleSave() {
        onSave({
            description,
            person_ids: personIds,
        });
    }

    function handleAddPersonSave(personId: string) {
        addPersonId(personId);
        handleShowAgencyForm();
    }

    if (formState && formState.editing) {
        return (
            <UpdatePersonForm
                person={formState.editing}
                onClose={handleShowAgencyForm}
            />
        );
    } else if (formState) {
        return (
            <AddPersonFormSelect
                onSave={handleAddPersonSave}
                onClose={handleShowAgencyForm}
            />
        );
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label={"Description"}
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </FieldsetWidget>
            <PersonCardDeck
                ids={personIds}
                onEdit={handleShowEditPersonForm}
                onRemove={removePersonId}
            />
            <SmallButtonWidget onClick={handleShowAddPersonform}>
                Add Person
            </SmallButtonWidget>
            <PersonListSelect
                ids={personIds}
                onSelect={addPersonId}
                onDeselect={removePersonId}
                onEdit={handleShowEditPersonForm}
            />
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}
