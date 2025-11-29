import {useEffect, useState} from "react";
import {useAddAgency} from "../../plugins/api/agencies.tsx";
import {SmallButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {DialogActionsWidget} from "../../widgets/containers/ModalDialogWidget.tsx";

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
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </>
    );
}