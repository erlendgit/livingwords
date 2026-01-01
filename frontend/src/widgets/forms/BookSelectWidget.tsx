import { MenuItem, type SelectProps } from "@mui/material";
import { SelectWidget } from "./SelectWidget.tsx";
import { useBookList } from "../../plugins/api/books.tsx";

type BookSelectWidgetProps = Omit<SelectProps, "onChange" | "value"> & {
    value: string;
    onChange: (newValue: string) => void;
};

export function BookSelectWidget(props: BookSelectWidgetProps) {
    const { onChange, ...rest } = props;
    const { data, isLoading, error } = useBookList();
    const books = data?.nodes || [];
    const hasBooks = books.length > 0;

    if (isLoading) return <p>Loading books...</p>;
    if (error) return <p>Error loading books: {error.message}</p>;
    if (!hasBooks) return <p>No books found.</p>;

    return (
        <SelectWidget
            onChange={(e) => onChange(e.target.value as string)}
            {...rest}
        >
            {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                    {book.title}
                </MenuItem>
            ))}
        </SelectWidget>
    );
}
