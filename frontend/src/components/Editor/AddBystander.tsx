import {AgencySelect} from "../Agency/AgencySelect.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";

interface AddBystanderProps {
    bystanderId: string | null;
    onChange: (value: string | null) => void;
}

export function AddBystander({bystanderId, onChange}: AddBystanderProps) {
    return (
        <SpaceWidget>
            <AgencySelect formTitle={"Omstander(s) toevoegen"}
                          description={"Dit zijn de omstanders"}
                          buttonLabel={"Omstanders kiezen"}
                          agencyId={bystanderId}
                          setAgencyId={onChange}/>
        </SpaceWidget>
    );
}