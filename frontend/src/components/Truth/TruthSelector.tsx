import {useState} from "react";
import {TruthListSelect} from "./TruthListSelect.tsx";
import {TruthAddSelect} from "./TruthAddSelect.tsx";

interface TruthSelectorProps {
    truthIds: string[],
    onAdd: (value: string) => void,
    onRemove: (value: string) => void,
    onCancel: () => void,
}

export function TruthSelector({truthIds, onAdd, onRemove, onCancel}: TruthSelectorProps) {
    const [viewMode, setViewMode] = useState<string>("list");
    const startListView = () => setViewMode("list");
    const startAddView = () => setViewMode("add");

    function handleAddNew(id: string) {
        onAdd(id);
        startListView()
    }

    return (
        <div>
            {viewMode === "list" && (
                <TruthListSelect
                    truthIds={truthIds}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onAddNew={startAddView}
                    onDone={onCancel}/>
            )}
            {viewMode === "add" && (
                <TruthAddSelect
                    onAdd={handleAddNew}
                    onCancel={startListView}/>
            )}
        </div>
    );

}