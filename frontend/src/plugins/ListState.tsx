import {useState} from "react";

type UseListStateResult<T> = [
    T[],
    (item: T) => void,
    (item: T) => void,
    () => void
];

function useListState<T>(initialItems: T[] = []): UseListStateResult<T> {
    const [items, setItems] = useState<T[]>(initialItems);

    const addItem = (item: T) => {
        if (!items.includes(item)) {
            setItems((prevItems) => [...prevItems, item]);
        }
    };

    const removeItem = (item: T) => {
        setItems((prevItems) => prevItems.filter((i) => i !== item));
    };

    const clearItems = () => {
        setItems([]);
    };

    return [
        items,
        addItem,
        removeItem,
        clearItems,
    ];
}

export default useListState;