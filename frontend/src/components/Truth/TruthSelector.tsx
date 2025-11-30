import {useState} from "react";
import {TruthListSelect} from "./TruthListSelect.tsx";
import {TruthAddSelect} from "./TruthAddSelect.tsx";

interface TruthSelectorProps {
    ids: string[],
    onAdd: (value: string) => void,
    onRemove: (value: string) => void,
    onCancel: () => void,
}

export function TruthSelector({ids, onAdd, onRemove, onCancel}: TruthSelectorProps) {
    const [viewMode, setViewMode] = useState<string>("list");
    const startListView = () => setViewMode("list");
    const startAddView = () => setViewMode("add");

    // TODO: ook bij story en context voor zo'n mechanisme zorgen.
    function handleAddNew(id: string) {
        onAdd(id);
        startListView()
    }

    return (
        <div>
            {viewMode === "list" && (
                <TruthListSelect
                    ids={ids}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onAddNew={startAddView}
                    onDone={onCancel}/>
            )}
            {viewMode === "add" && (
                <TruthAddSelect
                    onSave={handleAddNew}
                    onCancel={startListView}/>
            )}
        </div>
    );

}