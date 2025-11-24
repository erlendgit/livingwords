import {useEffect, useState} from "react";
import {useAddTruth} from "../../api/truths.tsx";

interface TruthAddSelectProps {
    onAdd: (value: string) => void;
    onCancel: () => void;
}

export function TruthAddSelect({onAdd, onCancel}: TruthAddSelectProps) {
    const {mutate: addTruth, data, isPending, isError} = useAddTruth()
    const [statement, setStatement] = useState<string>("");

    function handleSave() {
        addTruth({statement});
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onAdd(data?.node.id);
        }
    }, [data, isPending, isError]);

    return (
        <>
            <fieldset>
                <input type="text"
                       placeholder="Statement..."
                       value={statement}
                       onChange={(e) => setStatement(e.target.value)}/>
            </fieldset>
            {isPending && <p>Storing the truth...</p>}
            {isError && <p>Truth could not be stored.</p>}
            <div className={"grid"}>
                <button onClick={handleSave}>Add new truth</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
}