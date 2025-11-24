import {useState} from "react";
import {TruthCardMultiple} from "../Truth/TruthCard.tsx";
import {ModalDialog} from "../../layouts/ModalDialog.tsx";
import {TruthSelector} from "../Truth/TruthSelector.tsx";

interface AddTruthProps {
    truthIds: string[] | null;
    onChange: (value: string[]) => void;
}

export function AddTruth({truthIds, onChange}: AddTruthProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const startEdit = () => setEdit(true);
    const stopEdit = () => setEdit(false);
    const hasTruths = truthIds && truthIds.length > 0;

    return (
        <>
            {hasTruths && <TruthCardMultiple truthIds={truthIds}/>}
            <div role={"group"}>
                <button onClick={startEdit}>Select truth</button>
                {hasTruths && <button onClick={() => onChange([])}>Wis waarheid</button>}
            </div>
            {edit && (
                <ModalDialog title={"Select truth"} onCancel={stopEdit}>
                    <TruthSelector truthIds={truthIds || []} onChange={onChange} onCancel={stopEdit}/>
                </ModalDialog>
            )}
        </>
    );
}