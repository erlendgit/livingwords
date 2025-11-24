import {AgencySelect} from "../Agency/AgencySelect.tsx";

interface AddBystanderProps {
    bystanderId: string | null;
    onChange: (value: string | null) => void;
}

export function AddBystander({bystanderId, onChange}: AddBystanderProps) {
    return (
        <AgencySelect agencyType={"bystander"}
                      formTitle={"Omstander(s) toevoegen"}
                      description={"Dit zijn de omstanders"}
                      buttonLabel={"Omstanders kiezen"}
                      agencyId={bystanderId}
                      setAgencyId={onChange}/>
    );
}