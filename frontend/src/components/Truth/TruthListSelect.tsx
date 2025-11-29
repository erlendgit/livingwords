import {TruthCard, TruthCardView} from "./TruthCard.tsx";
import {useTruthList} from "../../plugins/api/truths.tsx";

interface TruthListSelectProps {
    truthIds: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
    onDone: () => void;
}

export function TruthListSelect({truthIds, onAdd, onRemove, onAddNew, onDone}: TruthListSelectProps) {
    const {data, isLoading, isError} = useTruthList();
    const truths = (data?.nodes || []).filter(truth => !truthIds.includes(truth.id));
    const hasTruths = truthIds && truthIds.length > 0;

    return (
        <>
            {hasTruths && (
                <ul>
                    {truthIds.map((id) => (
                        <li key={id}>
                            <TruthCard truthId={id}/>
                            <button onClick={() => onRemove(id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <hr/>
            {isLoading && <p>Loading truths...</p>}
            {isError && <p>Error while loading truths!</p>}
            {truths && (
                <ul>
                    {truths.map((truth) => (
                        <li key={truth.id}>
                            <TruthCardView truth={truth}/>
                            <button onClick={() => onAdd(truth.id)}>Add</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className={"grid"}>
                <button onClick={onAddNew}>Create new</button>
                <button onClick={onDone}>Done</button>
            </div>
        </>
    );
}