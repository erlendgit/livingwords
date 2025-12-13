import { Table, type TableProps } from "@mui/material";

export function TableWidget(props: TableProps) {
    return <Table {...props} />;
}

interface ItemTableWidgetProps<T> extends TableProps {
    items: T[];
    columnCallbacks: ((item: T) => React.ReactNode)[];
}

export function ItemTableWidget<T>({
    items,
    columnCallbacks,
    ...props
}: ItemTableWidgetProps<T>) {
    return (
        <Table {...props}>
            <tbody>
                {items.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columnCallbacks.map((callback, colIndex) => (
                            <td key={colIndex}>{callback(item)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
