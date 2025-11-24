import {useEffect, useState} from "react";
import {useAddAgency} from "../../api/agencies.tsx";

interface AgencyCreateSelectProps {
    role: string;
    onSelect: (value: string) => void;
    onCancel: () => void;
}

export function AgencyCreateSelect({role, onSelect, onCancel}: AgencyCreateSelectProps) {
    const [description, setDescription] = useState<string>("");
    const {mutate: addAgency, data,  isPending, isError} = useAddAgency()

    function handleSave() {
        addAgency({role, description})
    }

    useEffect(() => {
        if (data?.node && !isPending && !isError) {
            onSelect(data.node.id);
            onCancel();
        }
    }, [data, isPending, isError, onSelect, onCancel]);

    return (
        <>
            <div>
                <fieldset>
                    <input type={"text"}
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           placeholder={"Description"}/>
                </fieldset>
            </div>
            <div className={"grid"}>
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
}