import {useEffect, useState} from "react";
import {type Story, type StoryPayload, useAddStory, useUpdateStory} from "../../plugins/api/stories.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {MultilineTextInputWidget, TextInputWidget} from "../../widgets/forms/TextInputWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";

interface StoryAddProps {
    onSave: (value: string) => void,
    onClose: () => void,
}

export function StoryAddSelectForm({onSave, onClose}: StoryAddProps) {
    const {mutate: addStory, data, isPending, isError} = useAddStory()
    const story: Story | undefined = data?.node

    function handleSave(story: StoryPayload) {
        addStory(story)
    }

    useEffect(() => {
        if (story && !isPending && !isError) {
            onSave(story.id)
        }
    }, [onSave, story, isPending, isError])

    return (
        <StoryForm onSave={handleSave} onClose={onClose}>
            {isPending && <p>Storing the story...</p>}
            {isError && <p>Story could not be stored.</p>}
        </StoryForm>
    )

}

interface StoryUpdateFormProps {
    story: Story,
    onClose: () => void,
}

export function StoryUpdateForm({story, onClose}: StoryUpdateFormProps) {
    const {mutate: updateStory, data, isPending, error} = useUpdateStory(story.id);

    function handleSave(updatedStory: StoryPayload) {
        updateStory(updatedStory)
    }

    useEffect(() => {
        if (data && !isPending && !error) {
            onClose();
        }
    }, [data, isPending, error, onClose]);

    return (
        <StoryForm story={story} onSave={handleSave} onClose={onClose}>
            {isPending && <p>Updating the story...</p>}
            {error && <p>Story could not be updated.</p>}
        </StoryForm>
    )
}


interface StoryFormProps {
    story?: Story,
    onSave: (value: StoryPayload) => void,
    onClose: () => void,
    children?: React.ReactNode
}

export function StoryForm({story, onSave, onClose, children}: StoryFormProps) {
    const [title, setTitle] = useState<string>(story?.title || "");
    const [summary, setSummary] = useState<string>(story?.summary || "");

    function handleSave() {
        onSave({title, summary});
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <TextInputWidget
                    label={"Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value || "")}/>
                <MultilineTextInputWidget
                    label={"Summary"}
                    value={summary}
                    rows={4}
                    onChange={(e) => setSummary(e.target.value)}/>
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    )
}
