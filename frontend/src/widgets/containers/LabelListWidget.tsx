interface LabelListWidgetProps {
    items: React.ReactNode[];
}

export function LabelListWidget({ items }: LabelListWidgetProps) {
    return (
        <ul className="label-list-widget">
            {items.map((item, index) => (
                <li key={index} className="label-list-item">
                    {item}
                </li>
            ))}
        </ul>
    );
}
