import {TruthCard, TruthCardView} from "./TruthCard.tsx";
import {type Truth, useTruthList} from "../../plugins/api/truths.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import {ItemTableWidget} from "../../widgets/containers/TableWidget.tsx";

const TruthList = ItemTableWidget<Truth>;
const TruthIdList = ItemTableWidget<string>;

interface TruthListSelectProps {
    ids: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onDone: () => void;
}


export function TruthListSelect({ids, onAdd, onRemove, onAddNew, onDone}: TruthListSelectProps) {
    const {data, isLoading, isError} = useTruthList();
    const available = (data?.nodes || []).filter(truth => !ids.includes(truth.id));
    const hasTruths = ids.length > 0;

    return (
        <>
            {hasTruths && (
                <TruthIdList
                    items={ids}
                    columnCallbacks={[
                        (id: string) => <TruthCard truthId={id}/>,
                        (id: string) => (
                            <SmallButtonWidget onClick={() => onRemove(id)}>Remove</SmallButtonWidget>
                        ),
                    ]}/>
            )}
            {isLoading && <p>Loading truths...</p>}
            {isError && <p>Error while loading truths!</p>}
            {available.length > 0 && (
                <TruthList
                    items={available}
                    columnCallbacks={[
                        (truth: Truth) => <TruthCardView truth={truth}/>,
                        (truth: Truth) => (
                            <SmallButtonWidget onClick={() => onAdd(truth.id)}>Add</SmallButtonWidget>
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