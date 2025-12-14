export function useListModifiers<T>(
    items: T[],
    setItems: (items: T[]) => void,
): [(item: T) => void, (item: T) => void, () => void] {
    const addItem = (item: T) => {
        const currentItems = items || [];
        if (currentItems.includes(item)) {
            return;
        }
        setItems([...currentItems, item]);
    };
    const removeItem = (item: T) => {
        setItems(items.filter((i) => i !== item));
    };
    const clearItems = () => {
        setItems([]);
    };
    return [addItem, removeItem, clearItems];
}
