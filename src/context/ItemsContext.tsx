import * as React from 'react';

export interface Item {
    id: number,
    image: string,
    title: string,
    type: string,
}

export interface Items {
    state: ContextState,
    setItems: Function,
}

export interface ContextState {
    items: Item[],
    option: string,
    searchActive: boolean,
    search: string,
    showLoad: boolean,
    page: number,
    maxPage: number,
    topMovies: Item[],
    topShows: Item[],
}

const ItemsContext = React.createContext<Items>({
    state:
    {
        items: [], option: '', searchActive: false, search: '', showLoad: false,
        page: 1, maxPage: 1, topMovies: [], topShows: []
    },
    setItems: () => { }
});

export function useItems() {
    return React.useContext(ItemsContext)
}

interface ItemsProviderProps {
    children?: React.ReactNode,
}

const ItemsProvider = (props: ItemsProviderProps) => {
    const [state, setItems] = React.useState<ContextState>(
        {
            items: [], option: 'shows', searchActive: false, search: '', showLoad: false,
            page: 1, maxPage: 1, topMovies: [], topShows: []
        });

    return (
        <ItemsContext.Provider value={{ state, setItems }}>
            {props.children}
        </ItemsContext.Provider>
    );
}

export default ItemsProvider;