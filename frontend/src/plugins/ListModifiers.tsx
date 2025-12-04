export function useListModifiers<T>(items: T[], setItems: (items: T[]) => void): [(item: T) => void, (item: T) => void, () => void] {
    const addItem = (item: T) => {
        if (items.includes(item)) {
            return;
        }
        setItems([...items, item]);
    };
    const removeItem = (item: T) => {
        setItems(items.filter(i => i !== item));
    };
    const clearItems = () => {
        setItems([]);
    };
    return [addItem, removeItem, clearItems];
}
