import {ContextCard} from "../Context/ContextCard.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {useState} from "react";
import {ContextSelector} from "../Context/ContextSelector.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";

interface AddContextProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddContext({ids, onAdd, onRemove, onClear}: AddContextProps) {
    const [edit, setEdit] = useState<boolean>(false)

    function onCloseModal() {
        setEdit(false)
    }

    return (
        <SpaceWidget>
            {ids && (
                <ul>
                    {ids.map((id => (
                            <li key={id}>
                                <ContextCard contextId={id}/>
                                <SmallButtonWidget onClick={() => onRemove(id)}>Remove</SmallButtonWidget>
                            </li>
                        ))
                    )}
                </ul>
            )}
            <FlexWidget>
                <SmallButtonWidget onClick={() => setEdit(true)}>Add context</SmallButtonWidget>
                {ids && <SmallButtonWidget onClick={onClear}>Clear context</SmallButtonWidget>}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget title={"Describe the context"} onCancel={onCloseModal}>
                    <ContextSelector ids={ids} onAdd={onAdd} onRemove={onRemove} onClose={onCloseModal}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}