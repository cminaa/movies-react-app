import { Items } from "../../context/ItemsContext";
import { getMoviesByName, getShowsByName, getTopMovies, getTopShows } from "./Requests";

export const loadTopMovies = (elements: Items) => {
    if (elements.state.topMovies.length !== 0) {
        //read from "cached" top movies
        elements.setItems((prevState: Items) => {
            return { ...prevState, items: elements.state.topMovies, option: 'movies', showLoad: false }
        });
    }
    else {
        getTopMovies().then(
            films => elements.setItems((prevState: Items) => {
                return { ...prevState, items: films, topMovies: films, option: 'movies',showLoad: false }
            })
        );
    }
}

export const loadTopShows = (elements: Items) => {
    if (elements.state.topShows.length !== 0) {
        //read from "cached" top shows
        elements.setItems((prevState: Items) => {
            return { ...prevState, items: elements.state.topShows, option: 'shows', showLoad: false }
        });
    }
    else {
        getTopShows().then(
            series => elements.setItems((prevState: Items) => {
                return { ...prevState, items: series, topShows: series, option: 'shows', showLoad: false }
            })
        );
    }
}

export const filterMovies = (elements: Items, input: string) => {
    getMoviesByName(input,elements.state.page).then(
        res => elements.setItems((prevState: Items) => {
            let showLoadButton = elements.state.page+1 < res.maxPages;
            return { ...prevState, items: res.content, option: 'movies', search: input, searchActive: true, showLoad: showLoadButton, page:1, maxPage: res.maxPages }
        })
    );
}

export const filterShows = (elements: Items, input: string) => {
    getShowsByName(input, 1).then(
        res => elements.setItems((prevState: Items) => {
            let showLoadButton = elements.state.page+1 < res.maxPages;
            return { ...prevState, items: res.content, option: 'shows', search: input, searchActive: true, showLoad: showLoadButton,  page:1, maxPage: res.maxPages }
        })
    );
}

export const getMoreMovies = (elements: Items) => {
    getMoviesByName(elements.state.search, elements.state.page+1).then(
        res => elements.setItems((prevState: Items) => {
            let newItems = elements.state.items.concat(res.content);
            let showLoadButton = elements.state.page+1 < res.maxPages;
            return { ...prevState, items: newItems, showLoad: showLoadButton, page: elements.state.page + 1 }
        })
    );
}

export const getMoreShows = (elements: Items) => {
    getShowsByName(elements.state.search, elements.state.page+1).then(
        res => elements.setItems((prevState: Items) => {
            let newItems = elements.state.items.concat(res.content);
            let showLoadButton = elements.state.page+1 < res.maxPages;
            return { ...prevState, items: newItems, showLoad: showLoadButton, page: elements.state.page + 1 }
        })
    );
}