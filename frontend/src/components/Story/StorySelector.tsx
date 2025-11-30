import {useState} from "react";
import {StoryListSelect} from "./StoryListSelect.tsx";
import {StoryAddSelect} from "./StoryAddSelect.tsx";

interface StorySelectProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClose: () => void
}

export function StorySelector({ids, onAdd, onRemove, onClose}: StorySelectProps) {
    const [step, setStep] = useState<string>("list");

    const selectListView = () => setStep("list")
    const selectAddView = () => setStep("add")

    return (
        <>
            {step === 'list' && <StoryListSelect ids={ids}
                                                 onClickAdd={selectAddView}
                                                 onAdd={onAdd}
                                                 onRemove={onRemove}
                                                 onClose={onClose}/>}
            {step === 'add' && <StoryAddSelect onClose={selectListView}
                                               onSave={onAdd}/>}
        </>
    );
}


