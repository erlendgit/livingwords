import {AgencySelect} from "../Agency/AgencySelect.tsx";

interface AddSpeakerProps {
    speakerId: string | null;
    onChange: (value: string | null) => void;
}

export function AddSpeaker({speakerId, onChange}: AddSpeakerProps) {
    return (
        <AgencySelect agencyType={"speaker"}
                      formTitle={"Spreker toevoegen"}
                      description={"Dit is de spreker"}
                      buttonLabel={"Spreker kiezen"}
                      agencyId={speakerId}
                      setAgencyId={onChange}/>
    );
}