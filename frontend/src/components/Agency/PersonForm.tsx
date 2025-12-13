import {useEffect, useState} from "react";
import {type Person, type PersonPayload, useAddPerson, useUpdatePerson} from "../../plugins/api/persons.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextInputWidget, TextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";

interface AddPersonFormSelectProps {
    onSave: (personId: string) => void,
    onClose: () => void,
}

export function AddPersonFormSelect({onSave, onClose}: AddPersonFormSelectProps) {
    const {mutate: addPerson, data, isPending, isError} = useAddPerson();
    const person: Person | undefined = data?.node;

    function handleSave(value: PersonPayload) {
        addPerson(value);
    }

    useEffect(() => {
        if (person && !isPending && !isError) {
            onSave(person.id);
        }
    }, [person, isPending, isError, onSave]);

    return (
        <>
            <PersonForm onSave={handleSave} onCancel={onClose}>
                {isPending && <p>Storing the person...</p>}
                {isError && <p>Person could not be stored.</p>}
            </PersonForm>
        </>
    )
}

interface UpdatePersonFormSelectProps {
    person: Person,
    onClose: () => void,
}

export function UpdatePersonForm({person, onClose}: UpdatePersonFormSelectProps) {
    const {mutate: updatePerson, data, isPending, isError} = useUpdatePerson(person.id);

    function handleSave(value: PersonPayload) {
        updatePerson(value);
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onClose();
        }
    }, [data, isPending, isError, onClose]);

    return (
        <>
            <PersonForm person={person} onSave={handleSave} onCancel={onClose}>
                {isPending && <p>Updating the person...</p>}
                {isError && <p>Person could not be updated.</p>}
            </PersonForm>
        </>
    )
}

interface PersonFormProps {
    person?: Person;
    onSave: (value: PersonPayload) => void,
    onCancel: () => void;
    children?: React.ReactNode;
}

export function PersonForm({person, onSave, onCancel, children}: PersonFormProps) {
    const [name, setName] = useState<string>(person?.name || "");
    const [biography, setBio] = useState<string>(person?.biography || "");

    function handleSave() {
        onSave({name, biography});
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <TextInputWidget
                    label={"Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <MultilineTextInputWidget
                    label={"Biography"}
                    value={biography}
                    onChange={(e) => setBio(e.target.value)}/>
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}