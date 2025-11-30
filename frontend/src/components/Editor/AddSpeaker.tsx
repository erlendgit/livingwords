import {AgencySelect} from "../Agency/AgencySelect.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";

interface AddSpeakerProps {
    speakerId: string | null;
    onChange: (value: string | null) => void;
}

export function AddSpeaker({speakerId, onChange}: AddSpeakerProps) {
    return (
        <SpaceWidget>
            <AgencySelect formTitle={"Spreker toevoegen"}
                          description={"Dit is de spreker"}
                          buttonLabel={"Spreker kiezen"}
                          agencyId={speakerId}
                          setAgencyId={onChange}/>
        </SpaceWidget>
    );
}