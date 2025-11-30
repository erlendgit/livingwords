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

    const selectListView = () => setStep("list")
    const selectAddView = () => setStep("add")

    return (
        <>
            {step === 'list' && <ContextListSelectForm ids={ids}
                                                       onClickAdd={selectAddView}
                                                       onAdd={onAdd}
                                                       onRemove={onRemove}
                                                       onClose={onClose}/>}
            {step === 'add' && <ContextAddSelectForm onClose={selectListView}
                                                     onSave={onAdd}/>}
        </>
    );
}

