import {useState} from "react";
import {TruthListSelect} from "./TruthListSelect.tsx";
import {TruthAddSelect} from "./TruthAddSelect.tsx";

interface TruthSelectorProps {
    truthIds: string[],
    onChange: (value: string[]) => void,
    onCancel: () => void,
}

export function TruthSelector({truthIds, onChange, onCancel}: TruthSelectorProps) {
    const [viewMode, setViewMode] = useState<string>("list");
    const startListView = () => setViewMode("list");
    const startAddView = () => setViewMode("add");

    function handleAdd(id: string) {
        onChange([...truthIds, id]);
    }

    function handleRemove(id: string) {
        onChange(truthIds.filter(sid => sid !== id));
    }

    return (
        <div>
            {viewMode === "list" && (
                <TruthListSelect
                    truthIds={truthIds || []}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    onAddNew={startAddView}
                    onDone={onCancel}/>
            )}
            {viewMode === "add" && (
                <TruthAddSelect
                    onAdd={handleAdd}
                    onCancel={startListView}/>
            )}
        </div>
    );

}