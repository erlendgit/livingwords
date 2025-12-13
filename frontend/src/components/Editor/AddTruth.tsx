import { useState } from "react";
import { TruthCard } from "../Truth/TruthCard.tsx";
import ModalDialogWidget from "../../widgets/containers/ModalDialogWidget.tsx";
import { TruthSelector } from "../Truth/TruthSelector.tsx";
import {
    SmallButtonWidget,
    TextButtonWidget,
} from "../../widgets/forms/ButtonWidget.tsx";
import SpaceWidget from "../../widgets/layout/SpaceWidget.tsx";
import { FlexWidget } from "../../widgets/layout/FlexWidget.tsx";
import { ItemTableWidget } from "../../widgets/containers/TableWidget.tsx";

const TruthIdList = ItemTableWidget<string>;

interface AddTruthProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onClear: () => void;
}

export function AddTruth({ ids, onAdd, onRemove, onClear }: AddTruthProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const hasTruths = ids.length > 0;

    const handleOpenModal = () => setEdit(true);
    const handleCloseModal = () => setEdit(false);

    return (
        <SpaceWidget>
            {hasTruths && (
                <TruthIdList
                    items={ids}
                    columnCallbacks={[
                        (id: string) => <TruthCard truthId={id} />,
                        (id: string) => (
                            <TextButtonWidget onClick={() => onRemove(id)}>
                                Deselect
                            </TextButtonWidget>
                        ),
                    ]}
                />
            )}
            <FlexWidget>
                <SmallButtonWidget onClick={handleOpenModal}>
                    Select truth
                </SmallButtonWidget>
                {hasTruths && (
                    <SmallButtonWidget onClick={onClear}>
                        Clear value
                    </SmallButtonWidget>
                )}
            </FlexWidget>
            {edit && (
                <ModalDialogWidget
                    title={"Select truth"}
                    onCancel={handleCloseModal}
                >
                    <TruthSelector
                        ids={ids}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onCancel={handleCloseModal}
                    />
                </ModalDialogWidget>
            )}
        </SpaceWidget>
    );
}
