import {useState} from "react";
import {ContextListSelectForm} from "./ContextListSelectForm.tsx";
import {ContextAddSelectForm} from "./ContextAddSelectForm.tsx";

interface ContextSelectProps {
    ids: string[],
    onAdd: (value: string) => void,
    onRemove: (value: string) => void,
    onClose: () => void
}

export function ContextSelector({ids, onAdd, onRemove, onClose}: ContextSelectProps) {
    const [step, setStep] = useState<string>("list");

    const handleShowListView = () => setStep("list")
    const handleShowAddView = () => setStep("add")

    function handleAddNew(id: string) {
        onAdd(id);
        handleShowListView()
    }

    return (
        <>
            {step === 'list' && <ContextListSelectForm ids={ids}
                                                       onClickAdd={handleShowAddView}
                                                       onAdd={onAdd}
                                                       onRemove={onRemove}
                                                       onClose={onClose}/>}
            {step === 'add' && <ContextAddSelectForm onClose={handleShowListView}
                                                     onSave={handleAddNew}/>}
        </>
    );
}

