import {AgencySelect} from "../Agency/AgencySelect.tsx";

interface AddNarratorProps {
    narratorId: string | null;
    onChange: (value: string | null) => void;
}

export function AddNarrator({narratorId, onChange}: AddNarratorProps) {
    return (
        <AgencySelect agencyType={"narrator"}
                      formTitle={"Verteller toevoegen"}
                      description={"Dit is de verteller"}
                      buttonLabel={"Verteller kiezen"}
                      agencyId={narratorId}
                      setAgencyId={onChange}/>
    );
}