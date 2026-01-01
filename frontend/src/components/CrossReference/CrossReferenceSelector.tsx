import type { CrossReference } from "../../plugins/api/words.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";
import { useState } from "react";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import { AddCrossReferenceForm } from "./CrossReferenceForm.tsx";
import { CrossReferenceCard } from "./CrossReferenceCard.tsx";

interface CrossReferenceSelectorProps {
    references?: CrossReference[];
    onAdd: (value: CrossReference) => void;
    onRemove: (value: CrossReference) => void;
}

const CrossReferenceTable = ItemTableWidget<CrossReference>;

export function CrossReferenceSelector(props: CrossReferenceSelectorProps) {
    const { onAdd, onRemove, references } = props;
    const hasReferences = references && references.length > 0;
    return (
        <>
            {hasReferences && (
                <CrossReferenceTable
                    items={references || []}
                    columnCallbacks={[
                        (reference) => (
                            <CrossReferenceCard reference={reference} />
                        ),
                        (reference) => (
                            <TextButtonWidget
                                onClick={() => onRemove(reference)}
                            >
                                Remove
                            </TextButtonWidget>
                        ),
                    ]}
                />
            )}
            <AddCrossReferenceButton onAdd={onAdd}>
                Kruisverwijzing toevoegen
            </AddCrossReferenceButton>
        </>
    );
}

export function AddCrossReferenceButton(props: {
    onAdd: (value: CrossReference) => void;
    children: React.ReactNode;
}) {
    const { onAdd, children } = props;
    const [show, setShow] = useState<boolean>(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <SmallButtonWidget onClick={handleShow}>
                {children}
            </SmallButtonWidget>
            {show && (
                <ModalDialogWidget
                    title={"Describe the context"}
                    onCancel={handleClose}
                >
                    <AddCrossReferenceForm
                        onCancel={handleClose}
                        onAdd={onAdd}
                    />
                </ModalDialogWidget>
            )}
        </>
    );
}
