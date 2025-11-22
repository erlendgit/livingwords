interface SubmitProps {
    onSubmit: () => void;
}

export function EditSubmit({onSubmit}: SubmitProps) {
    return (
        <>
            <fieldset>
                <button type="button"
                        onClick={onSubmit}
                        style={{position: "absolute", bottom: "0", right: "0", marginBottom: ".5rem"}}>
                    Submit
                </button>
            </fieldset>
        </>
    );
}