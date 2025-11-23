interface ModalDialogProps {
    title: string,
    children: React.ReactNode,
}

export function ModalDialog({title, children}: ModalDialogProps) {
    return (
        <dialog id="modal" open>
            <article>
                <header>
                    <h3>{title}</h3>
                </header>
                {children}
            </article>
        </dialog>
    );
}