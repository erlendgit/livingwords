import {AgencySelect} from "../Agency/AgencySelect.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";

interface AddNarratorProps {
    narratorId: string | null;
    onChange: (value: string | null) => void;
}

export function AddNarrator({narratorId, onChange}: AddNarratorProps) {
    return (
        <SpaceWidget>
            <AgencySelect formTitle={"Verteller toevoegen"}
                          description={"Dit is de verteller"}
                          buttonLabel={"Verteller kiezen"}
                          agencyId={narratorId}
                          setAgencyId={onChange}/>
        </SpaceWidget>
    );
}