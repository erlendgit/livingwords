import {useState} from "react";
import {StoryListSelectForm} from "./StoryListSelectForm.tsx";
import {StoryAddSelectForm} from "./StoryAddSelectForm.tsx";

interface StorySelectModalProps {
    storyId: string | null,
    onChange: (value: string) => void,
    onClose: () => void
}

export function StorySelectorWizard({storyId, onChange, onClose}: StorySelectModalProps) {
    const [step, setStep] = useState<string>("list");

    const selectListView = () => setStep("list")
    const selectAddView = () => setStep("add")
    const selectStory = (id: string) => {
        onChange(id)
        onClose()
    }

    return (
        <>
            {step === 'list' && <StoryListSelectForm storyId={storyId}
                                                     onClickAdd={selectAddView}
                                                     onChange={selectStory}
                                                     onClose={onClose}/>}
            {step === 'add' && <StoryAddSelectForm onClose={selectListView}
                                                   selectStory={selectStory}/>}
        </>
    );
}


