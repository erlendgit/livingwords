interface ModalDialogProps {
    title: string,
    onCancel: () => void,
    children: React.ReactNode,
}

function ModalDialogWidget({title, onCancel, children}: ModalDialogProps) {
    return (
        <dialog id="modal" open>
            <article>
                <header className={"flex-space-between"}>
                    <h3>{title}</h3>
                    <button onClick={onCancel}>Close</button>
                </header>
                {children}
            </article>
        </dialog>
    );
}

export default ModalDialogWidget;