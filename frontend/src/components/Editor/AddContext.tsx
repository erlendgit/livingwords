import { ContextCard } from "../Context/ContextCard.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import { useState } from "react";
import { ContextSelector } from "../Context/ContextSelector.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";

const ContextIdList = ItemTableWidget<string>;

interface AddContextProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddContext({ ids, onAdd, onRemove, onClear }: AddContextProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const hasContext = ids.length > 0;

    const handleShowModal = () => setEdit(true);
    const handleCloseModal = () => setEdit(false);

    return (
        <SpaceWidget>
            {hasContext && (
                <ContextIdList
                    items={ids}
                    columnCallbacks={[
                        (id: string) => <ContextCard contextId={id} />,
                        (id: string) => (
                            <TextButtonWidget onClick={() => onRemove(id)}>
                                Deselect
                            </TextButtonWidget>
                        ),
                    ]}
                />
            )}
            <FlexWidget>
                <SmallButtonWidget onClick={handleShowModal}>
                    Add context
                </SmallButtonWidget>
                {hasContext && (
                    <SmallButtonWidget onClick={onClear}>
                        Clear value
                    </SmallButtonWidget>
                )}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget
                    title={"Describe the context"}
                    onCancel={handleCloseModal}
                >
                    <ContextSelector
                        ids={ids}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onClose={handleCloseModal}
                    />
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}
