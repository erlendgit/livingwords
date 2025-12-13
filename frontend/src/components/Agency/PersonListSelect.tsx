import {type Person, usePersonList} from "../../plugins/api/persons.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";
import {TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {FlexEndWidget} from "../../widgets/layout/FlexWidget.tsx";
import {useState, useEffect} from "react";
import {TextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";

const PersonTable = ItemTableWidget<Person>;

interface PersonListSelectProps {
    ids: string[];
    onSelect: (personId: string) => void;
    onDeselect: (personId: string) => void;
    onEdit: (person: Person) => void;
}

export function PersonListSelect({ids, onSelect, onDeselect, onEdit}: PersonListSelectProps) {
    const [query, setQuery] = useState<string>('');
    const {data, isLoading, isError, refetch} = usePersonList(query);
    const persons: Person[] = data?.nodes || [];
    const hasPersons = persons.length > 0;
    const hasQuery = query.length >= 2;

    useEffect(() => {
        if (hasQuery) {
            refetch();
        }
    }, [query, hasQuery, refetch]);

    if (isLoading) {
        return <div>Loading persons...</div>;
    }
    if (isError) {
        return <div>Error loading persons!</div>;
    }

    return (
        <>
            <h4>Bekende bijbelse personen</h4>
            <TextInputWidget
                label="Zoeken"
                value={query}
                onChange={(e) => setQuery(e.target.value)}/>

            {!hasPersons && <p>Geen personen gevonden</p>}
            {!hasQuery && <p>Vul een naam in om te zoeken</p>}
            {hasPersons && hasQuery &&
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
                }/>}
        </>
    )
}