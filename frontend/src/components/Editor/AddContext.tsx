import {ContextCard} from "../Context/ContextCard.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import {useState} from "react";
import {ContextSelector} from "../Context/ContextSelector.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import {FlexWidget} from "../../widgets/layout/FlexWidget.tsx";
import {SmallButtonWidget, TextButtonWidget} from "../../widgets/forms/ButtonWidget.tsx";
import {TableWidget} from "../../widgets/containers/TableWidget.tsx";

interface AddContextProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddContext({ids, onAdd, onRemove, onClear}: AddContextProps) {
    const [edit, setEdit] = useState<boolean>(false)
    const hasContext = ids.length > 0

    const handleShowModal = () => setEdit(true)
    const handleCloseModal = () => setEdit(false)

    return (
        <SpaceWidget>
            {hasContext && (
                <TableWidget>
                    {ids.map((id => (
                            <tr key={id}>
                                <td><ContextCard contextId={id}/></td>
                                <td>
                                    <TextButtonWidget onClick={() => onRemove(id)}>Remove</TextButtonWidget>
                                </td>
                            </tr>
                        ))
                    )}
                </TableWidget>
            )}
            <FlexWidget>
                <SmallButtonWidget onClick={handleShowModal}>Add context</SmallButtonWidget>
                {hasContext && <SmallButtonWidget onClick={onClear}>Clear context</SmallButtonWidget>}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget title={"Describe the context"} onCancel={handleCloseModal}>
                    <ContextSelector ids={ids} onAdd={onAdd} onRemove={onRemove} onClose={handleCloseModal}/>
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}