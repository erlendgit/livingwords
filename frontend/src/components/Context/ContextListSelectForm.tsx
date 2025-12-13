import { type Context, useContextList } from "../../plugins/api/contexts.tsx";
import { ContextCardView } from "./ContextCard.tsx";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import { DialogActionsWidget } from "../../widgets/containers/ModalDialogWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";
import { useState } from "react";
import { ContextUpdateForm } from "./ContextSelectForm.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";

const ContextList = ItemTableWidget<Context>;

interface ContextSelectListProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClickAdd: () => void;
    onClose: () => void;
}

export function ContextListSelectForm({
    ids,
    onAdd,
    onRemove,
    onClose,
    onClickAdd,
}: ContextSelectListProps) {
    const [editing, setEditing] = useState<Context | null>(null);

    const handleShowList = () => setEditing(null);
    const handleShowEdit = (context: Context) => setEditing(context);

    return (
        <>
            {editing && (
                <ContextUpdateForm context={editing} onClose={handleShowList} />
            )}
            {!editing && (
                <ContextListSelectTab
                    ids={ids}
                    onAdd={onAdd}
                    onEdit={handleShowEdit}
                    onRemove={onRemove}
                    onClickAdd={onClickAdd}
                    onClose={onClose}
                />
            )}
        </>
    );
}

interface ContextListSelectTabProps {
    ids: string[];
    onAdd: (value: string) => void;
    onEdit: (context: Context) => void;
    onRemove: (value: string) => void;
    onClickAdd: () => void;
    onClose: () => void;
}

function ContextListSelectTab({
    ids,
    onAdd,
    onEdit,
    onRemove,
    onClickAdd,
    onClose,
}: ContextListSelectTabProps) {
    const { data, isLoading, isError } = useContextList();
    const contexts: Context[] = data?.nodes || [];
    const hasContext: boolean = contexts.length > 0;

    if (isLoading) {
        return <p>Loading context...</p>;
    }
    if (isError) {
        return <p>Error while loading context options!</p>;
    }

    return (
        <>
            {hasContext && (
                <ContextList
                    items={contexts}
                    columnCallbacks={[
                        (context: Context) => (
                            <ContextCardView context={context} />
                        ),
                        (context: Context) => (
                            <FlexWidget>
                                {ids.includes(context.id) && (
                                    <TextButtonWidget
                                        onClick={() => onRemove(context.id)}
                                    >
                                        Deselect
                                    </TextButtonWidget>
                                )}
                                {!ids.includes(context.id) && (
                                    <SmallButtonWidget
                                        onClick={() => onAdd(context.id)}
                                    >
                                        Select
                                    </SmallButtonWidget>
                                )}
                                <TextButtonWidget
                                    onClick={() => onEdit(context)}
                                >
                                    Edit
                                </TextButtonWidget>
                            </FlexWidget>
                        ),
                    ]}
                />
            )}
            {!hasContext && <p>No context found yet.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onClickAdd}>
                    Add context
                </SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}
