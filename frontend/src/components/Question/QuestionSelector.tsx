import {useState} from "react";
import {QuestionListSelect} from "./QuestionListSelect.tsx";
import {QuestionAddSelect} from "./QuestionAddSelect.tsx";

interface QuestionSelectorProps {
    questionIds: string[],
    onChange: (value: string[]) => void,
    onCancel: () => void,
}

export function QuestionSelector({questionIds, onChange, onCancel}: QuestionSelectorProps) {
    const [viewMode, setViewMode] = useState<string>("list");
    const startListView = () => setViewMode("list");
    const startAddView = () => setViewMode("add");

    function handleAdd(id: string) {
        if (questionIds.includes(id)) {
            return;
        }
        onChange([...questionIds, id]);
    }

    function handleRemove(id: string) {
        if (!questionIds.includes(id)) {
            return;
        }
        onChange(questionIds.filter(sid => sid !== id));
    }

    function handleAddNew(id: string) {
        handleAdd(id);
        startListView()
    }

    return (
        <div>
            {viewMode === "list" && (
                <QuestionListSelect
                    questionIds={questionIds}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
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