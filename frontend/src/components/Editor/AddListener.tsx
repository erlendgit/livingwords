import {AgencySelect} from "../Agency/AgencySelect.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";

interface AddListenerProps {
    listenerId: string | null;
    onChange: (value: string | null) => void;
}

export function AddListener({listenerId, onChange}: AddListenerProps) {
    return (
        <SpaceWidget>
            <AgencySelect agencyType={"listener"}
                          formTitle={"Luisteraar toevoegen"}
                          description={"Dit is de luisteraar"}
                          buttonLabel={"Luisteraar kiezen"}
                          agencyId={listenerId}
                          setAgencyId={onChange}/>
        </SpaceWidget>
    );
}