import {TruthCard, TruthCardView} from "./TruthCard.tsx";
import {useTruthList} from "../../plugins/api/truths.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

interface TruthListSelectProps {
    ids: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onDone: () => void;
}

export function TruthListSelect({ids, onAdd, onRemove, onAddNew, onDone}: TruthListSelectProps) {
    const {data, isLoading, isError} = useTruthList();
    const truths = (data?.nodes || []).filter(truth => !ids.includes(truth.id));
    // TODO: ook bij stories en context voor zo'n mechanisme zorgen.
    const hasTruths = ids && ids.length > 0;

    return (
        <>
            {hasTruths && (
                <ul>
                    {ids.map((id) => (
                        <li key={id}>
                            <TruthCard truthId={id}/>
                            <SmallButtonWidget onClick={() => onRemove(id)}>Remove</SmallButtonWidget>
                        </li>
                    ))}
                </ul>
            )}
            {isLoading && <p>Loading truths...</p>}
            {isError && <p>Error while loading truths!</p>}
            {truths && (
                <ul>
                    {truths.map((truth) => (
                        <li key={truth.id}>
                            <TruthCardView truth={truth}/>
                            <SmallButtonWidget onClick={() => onAdd(truth.id)}>Add</SmallButtonWidget>
                        </li>
                    ))}
                </ul>
            )}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onAddNew}>Create new</SmallButtonWidget>
                <SmallButtonWidget onClick={onDone}>Done</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}