import {useState} from "react";
import {QuestionListSelect} from "./QuestionListSelect.tsx";
import {QuestionAddSelect} from "./QuestionForm.tsx";

interface QuestionSelectorProps {
    ids: string[],
    onAdd: (id: string) => void,
    onRemove: (id: string) => void,
    onCancel: () => void,
}

export function QuestionSelector({ids, onAdd, onRemove, onCancel}: QuestionSelectorProps) {
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
                <QuestionListSelect
                    ids={ids}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onAddNew={startAddView}
                    onCancel={onCancel}/>
            )}
            {viewMode === "add" && (
                <QuestionAddSelect
                    onSave={handleAddNew}
                    onCancel={startListView}/>
            )}
        </div>
    );

}