import { useEffect, useState } from "react";
import {
    type BookPayload,
    type Book,
    useAddBook,
    useBookStats,
    useEditBook,
} from "../../plugins/api/books.tsx";
import { SmallButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";
import { DialogActionsWidget } from "../../widgets/containers/ModalDialogWidget.tsx";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {
    MultilineTextInputWidget,
    TextInputWidget,
} from "../../widgets/forms/TextInputWidget.tsx";
import { BooleanInputWidget } from "../../widgets/forms/BooleanInputWidget.tsx";
import { SelectWithFallbackWidget } from "../../widgets/forms/SelectWidget.tsx";
import { MenuItem } from "@mui/material";

interface BookFormProps {
    book?: Book;
    onSave: (data: BookPayload) => void;
    onCancel: () => void;
    children: React.ReactNode;
}

function BookForm({ book, onSave, onCancel, children }: BookFormProps) {
    const [title, setTitle] = useState<string>(book?.title || "");
    const [summary, setSummary] = useState<string>(book?.summary || "");
    const [category, setCategory] = useState<string>("");
    const [manualCategory, setManualCategory] = useState<string>("");

    function handleSave() {
        onSave({ title, summary, category: manualCategory || category });
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <TextInputWidget
                    label={"Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <MultilineTextInputWidget
                    label={"Summary"}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={4}
                />
                <CategoryInputWidget
                    labelId={"book-category-select"}
                    value={category}
                    onChange={setCategory}
                    fallbackValue={manualCategory}
                    onChangeFallback={setManualCategory}
                />
            </FieldsetWidget>
            {children}
            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>Save</SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}

export function BookAddForm({ onClose }: { onClose: () => void }) {
    const [addMore, setAddMore] = useState<boolean>(false);
    const { mutate: addBook, data, isPending, isError } = useAddBook();

    useEffect(() => {
        if (data && !isPending && !isError && !addMore) {
            onClose();
        }
    }, [onClose, data, isPending, isError, addMore]);

    return (
        <BookForm onSave={addBook} onCancel={onClose}>
            <BooleanInputWidget
                label={"Formulier open laten"}
                value={addMore}
                onChange={() => {
                    setAddMore(!addMore);
                }}
            />
            {isPending && <p>Is storing book info...</p>}
            {isError && <p>An error occured! Try again later.</p>}
        </BookForm>
    );
}

export function BookEditForm({
    book,
    onClose,
}: {
    book: Book;
    onClose: () => void;
}) {
    const { mutate: editBook, data, isPending, isError } = useEditBook(book.id);

    useEffect(() => {
        if (data && !isPending && !isError) {
            onClose();
        }
    }, [onClose, data, isPending, isError]);

    return (
        <BookForm book={book} onSave={editBook} onCancel={onClose}>
            {isPending && <p>Is updating book info...</p>}
            {isError && <p>An error occured! Try again later.</p>}
        </BookForm>
    );
}

type CategoryInputWidgetProps = {
    labelId: string;
    value: string;
    onChange: (newValue: string) => void;
    fallbackValue: string;
    onChangeFallback: (newValue: string) => void;
};

export function CategoryInputWidget(props: CategoryInputWidgetProps) {
    const { labelId, value, onChange, fallbackValue, onChangeFallback } = props;
    const { data, isPending, isError } = useBookStats();
    const categories = data?.categories || [];

    return (
        <SelectWithFallbackWidget
            labelId={labelId}
            label={"Category"}
            value={value}
            onChange={(e) => onChange(e.target.value as string)}
            fallbackValue={fallbackValue}
            onChangeFallback={(e) => onChangeFallback(e.target.value as string)}
        >
            <MenuItem value="">None</MenuItem>
            {isPending && <option>Loading...</option>}
            {isError && <option>Error loading categories</option>}
            {!isPending &&
                !isError &&
                categories.map((category) => (
                    <MenuItem value={category}>{category}</MenuItem>
                ))}
        </SelectWithFallbackWidget>
    );
}
