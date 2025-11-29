import {type Context, useContextList} from "../../plugins/api/contexts.tsx";
import {ContextCardView} from "./ContextCard.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

interface ContextSelectListProps {
    storyId: string | null,
    onChange: (value: string) => void,
    onClickAdd: () => void,
    onClose: () => void,
}

export function ContextListSelectForm({storyId, onChange, onClose, onClickAdd}: ContextSelectListProps) {
    const {data, isLoading, isError} = useContextList();
    const contexts: Context[] | undefined = data?.nodes
    const hasStories: boolean = !!(contexts && contexts.length > 0)

    if (isLoading) {
        return <p>Loading context...</p>
    }
    if (isError) {
        return <p>Error while loading context options!</p>
    }

    return (
        <>
            {hasStories &&
                <table>
                    {contexts?.map((context) => (
                        <tr>
                            <td style={{width: "100%"}}>
                                <ContextCardView context={context}/>
                            </td>
                            <td>
                                {context.id !== storyId && (
                                    <SmallButtonWidget onClick={() => onChange(context.id)}>Select</SmallButtonWidget>)}
                            </td>
                        </tr>
                    ))}
                </table>
            }
            {!hasStories && <p>No context found yet.</p>}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={onClickAdd}>Add context</SmallButtonWidget>
                <SmallButtonWidget onClick={onClose}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}

