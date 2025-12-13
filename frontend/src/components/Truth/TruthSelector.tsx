import { useState } from "react";
import { TruthListSelectForm } from "./TruthListSelect.tsx";
import { TruthAddSelect } from "./TruthAddSelect.tsx";

interface TruthSelectorProps {
    ids: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
    onCancel: () => void;
}

export function TruthSelector({
    ids,
    onAdd,
    onRemove,
    onCancel,
}: TruthSelectorProps) {
    const [viewMode, setViewMode] = useState<string>("list");

    const handleStartListView = () => setViewMode("list");
    const handleStartAddView = () => setViewMode("add");
    const handleAddNew = (id: string) => {
        onAdd(id);
        handleStartListView();
    };

    return (
        <div>
            {viewMode === "list" && (
                <TruthListSelectForm
                    ids={ids}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onAddNew={handleStartAddView}
                    onDone={onCancel}
                />
            )}
            {viewMode === "add" && (
                <TruthAddSelect
                    onSave={handleAddNew}
                    onCancel={handleStartListView}
                />
            )}
        </div>
    );
}
