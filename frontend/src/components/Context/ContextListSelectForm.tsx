import {type Context, useContextList} from "../../plugins/api/contexts.tsx";
import {ContextCardView} from "./ContextCard.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";

const ContextList = ItemTableWidget<Context>;

interface ContextSelectListProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClickAdd: () => void;
    onClose: () => void;
}

export function ContextListSelectForm({ids, onAdd, onRemove, onClose, onClickAdd}: ContextSelectListProps) {
    const {data, isLoading, isError} = useContextList();
    const contexts: Context[] = data?.nodes || [];
    const hasContext: boolean = contexts.length > 0

    if (isLoading) {
        return <p>Loading context...</p>
    }
    if (isError) {
        return <p>Error while loading context options!</p>
    }

    return (
        <>
            {hasContext &&
                <ContextList
                    items={contexts}
                    columnCallbacks={[
                        (context: Context) => <ContextCardView context={context}/>,
                        (context: Context) => (
                            <>
                                {ids.includes(context.id) &&
                                    <TextButtonWidget onClick={() => onRemove(context.id)}>Remove</TextButtonWidget>}
                                {!ids.includes(context.id) &&
                                    <SmallButtonWidget onClick={() => onAdd(context.id)}>Select</SmallButtonWidget>}
                            </>
                        ),
                    ]}/>
            }
            {!hasContext && <p>No context found yet.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onClickAdd}>Add context</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}

