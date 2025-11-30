import {useState} from "react";
import {TruthCard} from "../Truth/TruthCard.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {TruthSelector} from "../Truth/TruthSelector.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";

interface AddTruthProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddTruth({ids, onAdd, onRemove, onClear}: AddTruthProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const startEdit = () => setEdit(true);
    const stopEdit = () => setEdit(false);
    const hasTruths = ids && ids.length > 0;

    return (
        <SpaceWidget>
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
            <FlexWidget>
                <SmallButtonWidget onClick={startEdit}>Select truth</SmallButtonWidget>
                {hasTruths && <SmallButtonWidget onClick={onClear}>Clear all truths</SmallButtonWidget>}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget title={"Select truth"} onCancel={stopEdit}>
                    <TruthSelector ids={ids} onAdd={onAdd} onRemove={onRemove} onCancel={stopEdit}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}