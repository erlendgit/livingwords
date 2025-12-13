import { TruthCardView } from "./TruthCard.tsx";
import { type Truth, useTruthList } from "../../plugins/api/truths.tsx";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import { DialogActionsWidget } from "../../widgets/containers/ModalDialogWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";
import { TruthUpdateForm } from "./TruthAddSelect.tsx";
import { useState } from "react";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";

const TruthList = ItemTableWidget<Truth>;

interface TruthListSelectProps {
    ids: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onDone: () => void;
}

export function TruthListSelectForm({
    ids,
    onAdd,
    onRemove,
    onAddNew,
    onDone,
}: TruthListSelectProps) {
    const [editing, setEditing] = useState<Truth | null>(null);

    const handleShowList = () => setEditing(null);
    const handleShowEdit = (truth: Truth) => setEditing(truth);

    return (
        <>
            {editing && (
                <TruthUpdateForm truth={editing} onClose={handleShowList} />
            )}
            {!editing && (
                <TruthListSelectTab
                    ids={ids}
                    onAdd={onAdd}
                    onEdit={handleShowEdit}
                    onRemove={onRemove}
                    onAddNew={onAddNew}
                    onDone={onDone}
                />
            )}
        </>
    );
}

interface TruthListSelectTabProps {
    ids: string[];
    onAdd: (id: string) => void;
    onEdit: (truth: Truth) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onDone: () => void;
}

export function TruthListSelectTab({
    ids,
    onAdd,
    onEdit,
    onRemove,
    onAddNew,
    onDone,
}: TruthListSelectTabProps) {
    const { data, isLoading, isError } = useTruthList();
    const truths = data?.nodes || [];
    const hasTruths = truths.length > 0;

    return (
        <>
            {isLoading && <p>Loading truths...</p>}
            {isError && <p>Error while loading truths!</p>}
            {hasTruths && (
                <TruthList
                    items={truths}
                    columnCallbacks={[
                        (truth: Truth) => <TruthCardView truth={truth} />,
                        (truth: Truth) => (
                            <FlexWidget>
                                {ids.includes(truth.id) && (
                                    <TextButtonWidget
                                        onClick={() => onRemove(truth.id)}
                                    >
                                        Deselect
                                    </TextButtonWidget>
                                )}
                                {!ids.includes(truth.id) && (
                                    <SmallButtonWidget
                                        onClick={() => onAdd(truth.id)}
                                    >
                                        Select
                                    </SmallButtonWidget>
                                )}
                                <TextButtonWidget onClick={() => onEdit(truth)}>
                                    Edit
                                </TextButtonWidget>
                            </FlexWidget>
                        ),
                    ]}
                />
            )}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onAddNew}>
                    Create new
                </SmallButtonWidget>
                <SmallButtonWidget onClick={onDone}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}
