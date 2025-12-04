import {TruthCardView} from "./TruthCard.tsx";
import {type Truth, useTruthList} from "../../plugins/api/truths.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";

const TruthList = ItemTableWidget<Truth>;

interface TruthListSelectProps {
    ids: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onDone: () => void;
}


export function TruthListSelect({ids, onAdd, onRemove, onAddNew, onDone}: TruthListSelectProps) {
    const {data, isLoading, isError} = useTruthList();
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
                        (truth: Truth) => <TruthCardView truth={truth}/>,
                        (truth: Truth) => (
                            <>
                                {ids.includes(truth.id) &&
                                    <TextButtonWidget onClick={() => onRemove(truth.id)}>Remove</TextButtonWidget>}
                                {!ids.includes(truth.id) &&
                                    <SmallButtonWidget onClick={() => onAdd(truth.id)}>Select</SmallButtonWidget>}
                            </>
                        ),
                    ]}/>
            )}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onAddNew}>Create new</SmallButtonWidget>
                <SmallButtonWidget onClick={onDone}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}