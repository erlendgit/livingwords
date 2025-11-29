import {Box, Dialog, DialogContent, DialogTitle} from "@mui/material";

interface ModalDialogProps {
    title: string,
    onCancel: () => void,
    children: React.ReactNode,
}

function ModalDialogWidget({title, onCancel, children}: ModalDialogProps) {
    return (
        <Dialog open={true} onClose={onCancel}>
            <Box sx={{width: '567px', maxWidth: '90vw'}}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Box>
        </Dialog>
    );
}

/**
 * Use when the dialog action is known only inside a DialogContent component.
 *
 * @param children
 * @constructor
 */
export function DialogActionsWidget({children}: { children: React.ReactNode }) {
    return (
        <Box sx={{
            margin: '.66rem -.66rem -.66rem -.66rem',
            display: "flex",
            justifyContent: "space-between",
            gap: ".5rem",
            "& > *": {flex: 1}
        }}>
            {children}
        </Box>
    );
}

export default ModalDialogWidget;