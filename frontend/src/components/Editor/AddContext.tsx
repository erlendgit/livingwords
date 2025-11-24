import {ContextCard} from "../Context/ContextCard.tsx";
import {ModalDialog} from "../../layouts/ModalDialog.tsx";
import {useState} from "react";
import {ContextSelector} from "../Context/ContextSelector.tsx";

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
        <div className={"add-context"}>
            {contextId && <ContextCard contextId={contextId}/>}
            <div role={"group"}>
                <button onClick={() => setEdit(true)}>Add context</button>
                {contextId && <button onClick={() => onChange(null)}>Clear context</button>}
            </div>
            {edit && (
                <ModalDialog title={"Describe the context"} onCancel={onCloseModal}>
                    <ContextSelector contextId={contextId} onChange={onChange} onClose={onCloseModal}/>
                </ModalDialog>
            )}
        </div>
    );
}