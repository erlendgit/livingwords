import type { CrossReference } from "../../plugins/api/words.tsx";
import { useState } from "react";
import FormWidget from "../../widgets/forms/FormWidget.tsx";
import { SmallButtonWidget } from "../../widgets/forms/ButtonWidget.tsx";
import { DialogActionsWidget } from "../../widgets/containers/ModalDialogWidget.tsx";
import FieldsetWidget from "../../widgets/forms/FieldsetWidget.tsx";
import {
    IntegerInputWidget,
    MultilineTextInputWidget,
} from "../../widgets/forms/TextInputWidget.tsx";
import { BookSelectWidget } from "../../widgets/forms/BookSelectWidget.tsx";

interface AddCrossReferenceFormProps {
    onAdd: (value: CrossReference) => void;
    onCancel: () => void;
}

export function AddCrossReferenceForm(props: AddCrossReferenceFormProps) {
    return <CrossReferenceForm {...props} />;
}

interface CrossReferenceFormProps {
    reference?: CrossReference;
    onAdd: (value: CrossReference) => void;
    onCancel: () => void;
}

export function CrossReferenceForm(props: CrossReferenceFormProps) {
    const { reference } = props;
    const { onAdd, onCancel } = props;
    const [bookId, setBookId] = useState<string>(
        props.reference?.book_id || "",
    );
    const [chapter, setChapter] = useState<number>(
        props.reference?.chapter || 1,
    );
    const [verse, setVerse] = useState<number>(props.reference?.verse || 1);
    const [quotedAs, setQuotedAs] = useState<string>(
        props.reference?.content || "",
    );

    function handleSave() {
        onAdd({
            book_id: bookId,
            chapter: chapter,
            verse: verse,
            content: quotedAs || undefined,
        });
        onCancel();
    }

    return (
        <FormWidget>
            <FieldsetWidget>
                <BookSelectWidget
                    labelId={"book"}
                    label={"Book"}
                    value={bookId}
                    onChange={setBookId}
                />
            </FieldsetWidget>
            <FieldsetWidget>
                <IntegerInputWidget
                    label={"Chapter"}
                    value={chapter}
                    onChange={setChapter}
                />
                <IntegerInputWidget
                    label={"Verse"}
                    value={verse}
                    onChange={setVerse}
                />
            </FieldsetWidget>
            <FieldsetWidget>
                <MultilineTextInputWidget
                    label={"Quoted as"}
                    value={quotedAs}
                    onChange={(e) => setQuotedAs(e.target.value)}
                />
            </FieldsetWidget>

            <DialogActionsWidget>
                <SmallButtonWidget onClick={handleSave}>
                    {reference ? "Save" : "Add"}
                </SmallButtonWidget>
                <SmallButtonWidget onClick={onCancel}>Cancel</SmallButtonWidget>
            </DialogActionsWidget>
        </FormWidget>
    );
}
