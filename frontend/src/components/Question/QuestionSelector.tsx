import {useState} from "react";
import {QuestionListSelect} from "./QuestionListSelect.tsx";
import {QuestionAddSelect} from "./QuestionAddSelect.tsx";

interface QuestionSelectorProps {
    questionIds: string[],
    onAdd: (id: string) => void,
    onRemove: (id: string) => void,
    onCancel: () => void,
}

export function QuestionSelector({questionIds, onAdd, onRemove, onCancel}: QuestionSelectorProps) {
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
                    questionIds={questionIds}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onAddNew={startAddView}
                    onDone={onCancel}/>
            )}
            {viewMode === "add" && (
                <QuestionAddSelect
                    onAdd={handleAddNew}
                    onCancel={startListView}/>
            )}
        </div>
    );

}