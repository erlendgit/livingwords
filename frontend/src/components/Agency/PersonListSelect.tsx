import {type Person, usePersonList} from "../../plugins/api/persons.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";
import {TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {FlexEndWidget} from "../../widgets/layout/FlexWidget.tsx";

const PersonTable = ItemTableWidget<Person>;

interface PersonListSelectProps {
    ids: string[];
    onSelect: (personId: string) => void;
    onDeselect: (personId: string) => void;
    onEdit: (person: Person) => void;
}

export function PersonListSelect({ids, onSelect, onDeselect, onEdit}: PersonListSelectProps) {
    const {data, isLoading, isError} = usePersonList();
    const persons: Person[] = data?.nodes || [];

    if (isLoading) {
        return <div>Loading persons...</div>;
    }
    if (isError) {
        return <div>Error loading persons!</div>;
    }
    if (persons.length === 0) {
        return <div>No persons available.</div>;
    }

    return (
        <>
            <h3>All persons available</h3>
            <PersonTable items={persons} columnCallbacks={
                [
                    (person: Person) => <p>{person.name}</p>,
                    (person: Person) => (
                        <FlexEndWidget>
                            {!ids.includes(person.id) &&
                                <TextButtonWidget onClick={() => onSelect(person.id)}>Select</TextButtonWidget>}
                            {ids.includes(person.id) &&
                                <TextButtonWidget onClick={() => onDeselect(person.id)}>Deselect</TextButtonWidget>}
                            <TextButtonWidget onClick={() => onEdit(person)}>Edit</TextButtonWidget>
                        </FlexEndWidget>
                    )
                ]
            }/>
        </>
    )
}