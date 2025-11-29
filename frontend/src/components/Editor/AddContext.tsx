import {ContextCard} from "../Context/ContextCard.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {useState} from "react";
import {ContextSelector} from "../Context/ContextSelector.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";

interface AddContextProps {
    contextId: string | null;
    onChange: (value: string | null) => void;
}

export function AddContext({contextId, onChange}: AddContextProps) {
    const [edit, setEdit] = useState<boolean>(false)

    function onCloseModal() {
        setEdit(false)
    }

    return (
        <SpaceWidget>
            {contextId && <ContextCard contextId={contextId}/>}
            <FlexWidget>
                <SmallButtonWidget onClick={() => setEdit(true)}>Add context</SmallButtonWidget>
                {contextId && <SmallButtonWidget onClick={() => onChange(null)}>Clear context</SmallButtonWidget>}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget title={"Describe the context"} onCancel={onCloseModal}>
                    <ContextSelector contextId={contextId} onChange={onChange} onClose={onCloseModal}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}