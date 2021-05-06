import * as React from 'react';
import '../assets/css/Home.css';
import NavButton from './NavButton';
import ItemGrid from './ItemGrid';
import SearchBar from './SearchBar';
import LoadButton from './LoadButton';
import { Items, useItems } from '../context/ItemsContext';
import { filterMovies, filterShows, loadTopMovies, loadTopShows } from '../assets/util/DataLoaders';

const Home: React.FC = () => {
    let elements = useItems();

    const filterElements = (input: string) => {
        let searchLen = input.length;
        if (searchLen < 3) {
            if (elements.state.option === "movies") {
                loadTopMovies(elements);
            } else {
                loadTopShows(elements);
            }
            elements.setItems((prevState: Items) => {
                return { ...prevState, searchActive: false }
            })
        } else {
            if (elements.state.option === "movies") {
               filterMovies(elements, input);
            } else {
               filterShows(elements, input);
            }
        }
    }

    return (
        <div>
            <div className="Home-buttons">
                <NavButton buttonStyle="Home-button" content="Movies" id="movies" page="home" />
                <NavButton buttonStyle="Home-button-clicked" content="TV Shows" id="shows" page="home" />
            </div>
            <SearchBar handleSearch={filterElements} />
            <br />
            <ItemGrid />
            <br />
            { elements.state.showLoad && <LoadButton />}
        </div>
    );
}

export default Home;