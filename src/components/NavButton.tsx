import { useEffect } from 'react';
import { useHistory } from 'react-router';
import '../assets/css/Button.css';
import { filterMovies, filterShows, loadTopMovies, loadTopShows } from '../assets/util/DataLoaders';
import { useItems } from '../context/ItemsContext';

export interface ButtonProps {
    content: string,
    buttonStyle: string,
    page?: string,
    id?: string,
}

const NavButton = (props: ButtonProps) => {

    let elements = useItems();
    let history = useHistory();

    useEffect(() => {
        if (props.page === 'home') {
            if (elements.state.option === 'movies') {
                document.getElementsByTagName("button")[0].className = "Home-button-clicked";
                document.getElementsByTagName("button")[1].className = "Home-button";
            } else {
                document.getElementsByTagName("button")[1].className = "Home-button-clicked";
                document.getElementsByTagName("button")[0].className = "Home-button";
            }
        }
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let element = (e.target as HTMLButtonElement);
        if (props.page === "home") {
            let oldClick = element.className === "Home-button-clicked";
            if (!oldClick) {
                colorButton();
                if (element === (document.getElementById("movies") as HTMLButtonElement)) {
                    if (!elements.state.searchActive) loadTopMovies(elements);
                    else filterMovies(elements, elements.state.search);
                }
                else {
                    if (!elements.state.searchActive) loadTopShows(elements);
                    else filterShows(elements, elements.state.search);
                }
            }
        }
        else if (props.page === "singleItem") {
            history.goBack();
        }
    }

    const colorButton = () => {
        let idPrevious = document.getElementsByClassName("Home-button-clicked")[0].id;
        document.getElementsByClassName("Home-button-clicked")[0].className = "Home-button";
        if (idPrevious !== document.getElementsByClassName("Home-button")[0].id) {
            document.getElementsByClassName("Home-button")[0].className = "Home-button-clicked";
        } else {
            document.getElementsByClassName("Home-button")[1].className = "Home-button-clicked";
        }
    }

    return (
        <button className={props.buttonStyle} id={props.id} onClick={handleClick}>{props.content}</button>
    );
}

export default NavButton;