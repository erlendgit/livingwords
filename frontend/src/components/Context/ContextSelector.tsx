import {useState} from "react";
import {ContextListSelectForm} from "./ContextListSelectForm.tsx";
import {ContextAddSelectForm} from "./ContextAddSelectForm.tsx";

interface ContextSelectProps {
    contextId: string | null,
    onChange: (value: string) => void,
    onClose: () => void
}

export function ContextSelector({contextId, onChange, onClose}: ContextSelectProps) {
    const [step, setStep] = useState<string>("list");

    const selectListView = () => setStep("list")
    const selectAddView = () => setStep("add")
    const selectStory = (id: string) => {
        onChange(id)
        onClose()
    }

    return (
        <>
            {step === 'list' && <ContextListSelectForm storyId={contextId}
                                                       onClickAdd={selectAddView}
                                                       onChange={selectStory}
                                                       onClose={onClose}/>}
            {step === 'add' && <ContextAddSelectForm onClose={selectListView}
                                                     selectContext={selectStory}/>}
        </>
    );
}

