import {useState} from "react";
import {StoryListSelect} from "./StoryListSelect.tsx";
import {StoryAddSelectForm} from "./StoryForm.tsx";

interface StorySelectProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClose: () => void
}

export function StorySelector({ids, onAdd, onRemove, onClose}: StorySelectProps) {
    const [step, setStep] = useState<string>("list");

    const handleShowListView = () => setStep("list")
    const handleShowAddForm = () => setStep("add")
    const handleAddNew = (id: string) => {
        onAdd(id);
        handleShowListView()
    }

    return (
        <>
            {step === 'list' && <StoryListSelect ids={ids}
                                                 onClickAdd={handleShowAddForm}
                                                 onAdd={onAdd}
                                                 onRemove={onRemove}
                                                 onClose={onClose}/>}
            {step === 'add' && <StoryAddSelectForm onClose={handleShowListView}
                                                   onSave={handleAddNew}/>}
        </>
    );
}


