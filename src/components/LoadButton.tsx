import '../assets/css/Button.css';
import { getMoreMovies, getMoreShows } from '../assets/util/DataLoaders';
import { useItems } from '../context/ItemsContext';

const LoadButton = () => {

    let elements = useItems();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let page = elements.state.page + 1;
        if (page <= elements.state.maxPage) {
            if (elements.state.option === "movies") {
                getMoreMovies(elements);
            } else {
                getMoreShows(elements);
            }
        }
    }

    return (
        <button className="Home-button Load-button" onClick={handleClick}>Load more...</button>
    );
}

export default LoadButton;