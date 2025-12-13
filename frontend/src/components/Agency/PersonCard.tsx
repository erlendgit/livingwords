import { type Person, usePerson } from "../../plugins/api/persons.tsx";
import { LabelListWidget } from "../../widgets/containers/LabelListWidget.tsx";
import { LinkButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";

interface PersonCardDeckProps {
    ids: string[];
    onEdit?: (person: Person) => void;
    onRemove?: (id: string) => void;
}

export function PersonCardDeck({ ids, onEdit, onRemove }: PersonCardDeckProps) {
    return (
        <LabelListWidget
            items={ids.map((id) => (
                <PersonCard id={id} onEdit={onEdit} onRemove={onRemove} />
            ))}
        />
    );
}

interface PersonCardProps {
    id: string;
    onEdit?: (person: Person) => void;
    onRemove?: (id: string) => void;
}

export function PersonCard({ id, onEdit, onRemove }: PersonCardProps) {
    const { data, isLoading, isError } = usePerson(id);
    const person: Person | undefined = data?.node;

    if (isLoading) {
        return <span>Loading person...</span>;
    }
    if (isError || !person) {
        return <span>Error loading person!</span>;
    }

    return (
        <PersonCardView person={person} onEdit={onEdit} onRemove={onRemove} />
    );
}

interface PersonCardViewProps {
    person: Person;
    onEdit?: (person: Person) => void;
    onRemove?: (id: string) => void;
}

export function PersonCardView({
    person,
    onEdit,
    onRemove,
}: PersonCardViewProps) {
    return (
        <>
            <span> {person.name} </span>
            {onEdit && (
                <LinkButtonWidget onClick={() => onEdit(person)}>
                    Edit
                </LinkButtonWidget>
            )}
            {onRemove && (
                <LinkButtonWidget onClick={() => onRemove(person.id)}>
                    Remove
                </LinkButtonWidget>
            )}
        </>
    );
}
