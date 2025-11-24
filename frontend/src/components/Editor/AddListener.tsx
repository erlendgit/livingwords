import {AgencySelect} from "../Agency/AgencySelect.tsx";

interface AddListenerProps {
    listenerId: string | null;
    onChange: (value: string | null) => void;
}

export function AddListener({listenerId, onChange}: AddListenerProps) {
    return (
        <AgencySelect agencyType={"listener"}
                      formTitle={"Luisteraar toevoegen"}
                      description={"Dit is de luisteraar"}
                      buttonLabel={"Luisteraar kiezen"}
                      agencyId={listenerId}
                      setAgencyId={onChange}/>
    );
}