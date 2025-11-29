import {useState} from "react";
import {TruthCard} from "../Truth/TruthCard.tsx";
import ModalDialogWidget from "../../widgets/ModalDialogWidget.tsx";
import {TruthSelector} from "../Truth/TruthSelector.tsx";

interface AddTruthProps {
    truthIds: string[];
    onChange: (value: string[]) => void;
}

export function AddTruth({truthIds, onChange}: AddTruthProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const startEdit = () => setEdit(true);
    const stopEdit = () => setEdit(false);
    const hasTruths = truthIds && truthIds.length > 0;

    function handleAdd(id: string) {
        if (truthIds.includes(id)) {
            return;
        }
        onChange([...truthIds, id]);
    }

    function handleRemove(id: string) {
        if (!truthIds.includes(id)) {
            return;
        }
        onChange(truthIds.filter(sid => sid !== id));
    }

    return (
        <div>
            {hasTruths && (
                <ul>
                    {truthIds.map((id) => (
                        <li key={id}>
                            <TruthCard truthId={id}/>
                            <button onClick={() => handleRemove(id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={startEdit}>Select truth</button>
            {edit && (
                <ModalDialogWidget title={"Select truth"} onCancel={stopEdit}>
                    <TruthSelector truthIds={truthIds} onAdd={handleAdd} onRemove={handleRemove} onCancel={stopEdit}/>
                </ModalDialogWidget>
            )}
        </div>
    );
}