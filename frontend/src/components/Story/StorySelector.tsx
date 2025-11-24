import {useState} from "react";
import {StoryListSelect} from "./StoryListSelect.tsx";
import {StoryAddSelect} from "./StoryAddSelect.tsx";

interface StorySelectProps {
    storyId: string | null,
    onChange: (value: string) => void,
    onClose: () => void
}

export function StorySelector({storyId, onChange, onClose}: StorySelectProps) {
    const [step, setStep] = useState<string>("list");

    const selectListView = () => setStep("list")
    const selectAddView = () => setStep("add")
    const selectStory = (id: string) => {
        onChange(id)
        onClose()
    }

    return (
        <>
            {step === 'list' && <StoryListSelect storyId={storyId}
                                                 onClickAdd={selectAddView}
                                                 onChange={selectStory}
                                                 onClose={onClose}/>}
            {step === 'add' && <StoryAddSelect onClose={selectListView}
                                               selectStory={selectStory}/>}
        </>
    );
}


