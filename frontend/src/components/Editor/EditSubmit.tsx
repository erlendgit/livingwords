interface SubmitProps {
    onSubmit: () => void;
}

export function EditSubmit({onSubmit}: SubmitProps) {
    return (
        <>
            <fieldset style={{position: "relative"}}>
                <button type="button"
                        onClick={onSubmit}
                        style={{position: "absolute", bottom: "1rem", right: "0", marginBottom: ".5rem"}}>
                    Submit
                </button>
            </fieldset>
        </>
    );
}