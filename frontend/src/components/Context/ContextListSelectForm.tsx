import {type Context, useContextList} from "../../plugins/api/contexts.tsx";
import {ContextCardView} from "./ContextCard.tsx";

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
                                    <button onClick={() => onChange(context.id)}>Select</button>)}
                            </td>
                        </tr>
                    ))}
                </table>
            }
            {!hasStories && <p>No context found yet.</p>}
            <div className={"grid"}>
                <button onClick={onClickAdd}>Add context</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </>
    );
}

