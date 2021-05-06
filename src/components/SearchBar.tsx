import { useEffect, useState } from 'react';
import '../assets/css/Home.css';
import { Items, useItems } from '../context/ItemsContext';

export interface SearchBarProps {
    handleSearch: Function,
}

const SearchBar = (props: SearchBarProps) => {
    
    let elements = useItems();
    const [searchValue, setSearchValue] = useState('')
    const [timeoutID, setTimeoutID] = useState<number | undefined>();

    const debounce = (f: Function, delay: number, input: string) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        let id = setTimeout(f, delay, input);
        setTimeoutID(id);
    };

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        elements.setItems((prevState: Items) => {
            return { ...prevState, search: e.target.value }
        })
        debounce(props.handleSearch, 1000, e.target.value);
    };

    useEffect(()=>{
        if(elements.state.search!==''){
            setSearchValue(elements.state.search)
        }
    }, []);

    return (
        <input type="search" placeholder="Search" value={searchValue} id="search" className="Home-search-bar" onChange={handleKeyChange}></input>
    );
}

export default SearchBar;