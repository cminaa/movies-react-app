import { CardItem } from '../../components/MoviePage';
import { Item as ItemModel } from '../../context/ItemsContext';

const API_KEY = "03efb2085202447a0101e76673eb733d";
let URL_BASE = "https://api.themoviedb.org/3";

const getPosterPath = (element: any): string => {
    let imgUrl = "https://image.tmdb.org/t/p/w500";
    if (element.poster_path !== null) imgUrl += element.poster_path;
    else if (element.backdrop_path !== null) imgUrl += element.backdrop_path;
    else imgUrl = "https://gotripslk.com/site/images/uploads/img.jpg";
    return imgUrl;
}

const getImagePath = (element: any): string => {
    let imgUrl = "https://image.tmdb.org/t/p/w500";
    if (element.backdrop_path !== null) imgUrl += element.backdrop_path;
    else if (element.poster_path !== null) imgUrl += element.poster_path;
    else imgUrl = "https://gotripslk.com/site/images/uploads/img.jpg";
    return imgUrl;
}

export async function getTopMovies(): Promise<ItemModel[]> {
    let films: ItemModel[] = [];
    const res = await fetch(URL_BASE + "/movie/top_rated?api_key=" + API_KEY + "&language=en-US&page=1");

    let count = 0;
    const json = await res.json();
    for (let element of json.results) {
        let imgUrl = getPosterPath(element);
        let film = { id: element.id, title: element.original_title, image: imgUrl, type: "movie" };
        films.push(film);
        count++;
        if (count === 10) break; 
    }
    return films;
}

export async function getTopShows(): Promise<ItemModel[]> {
    let series: ItemModel[] = [];
    const res = await fetch(URL_BASE + "/tv/popular?api_key=" + API_KEY + "&language=en-US&page=1");
    let count = 0;
    const json = await res.json();
    for (let element of json.results) {
        let imgUrl = getPosterPath(element);
        let show = { id: element.id, title: element.name, image: imgUrl, type: "show" };
        series.push(show);
        count++;
        if (count === 10) break;
    }
    return series;
}

export async function getMovieDetails(id: number): Promise<CardItem> {
    let film: CardItem = {
        title: 'Sorry!',
        tagline: '',
        desc: 'Movie Not Found',
        image: "https://i1.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1",
        hasVideo: false,
        videoSrc:''
    };
    const res = await fetch(URL_BASE + "/movie/" + id + "?api_key=" + API_KEY + "&language=en-US");
    const json = await res.json();
    if (!json.hasOwnProperty("title")) {
        return film;
    }
    let element = json;
    let imgUrl = getImagePath(element);
    let hasVideo = false;
    let video = '';
    const videoRes = await fetch(URL_BASE + "/movie/" + id + "/videos?api_key=" + API_KEY + "&language=en-US");
    const videoJson = await videoRes.json();
    for (let element of videoJson.results) {
        if (element.type === "Trailer"){
            hasVideo=true;
            video="https://www." + element.site + ".com/embed/" + element.key;
        }
    }
    film = {
        title: element.title,
        tagline: element.tagline,
        desc: element.overview,
        image: imgUrl,
        hasVideo: hasVideo,
        videoSrc: video
    }
    return film;
}

export async function getShowDetails(id: number): Promise<CardItem> {
    let show: CardItem = {
        title: 'Sorry!',
        tagline: '',
        desc: 'TV Show Not Found',
        image: "https://i1.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1",
        hasVideo: false,
        videoSrc:''
    };
    const res = await fetch(URL_BASE + "/tv/" + id + "?api_key=" + API_KEY + "&language=en-US");
    const json = await res.json();
    if (!json.hasOwnProperty("original_name")) {
        return show;
    }
    let element = json;
    let imgUrl = getImagePath(element);

    let tag = "Number of seasons: " + element.number_of_seasons;
    if (element.number_of_seasons === 0) tag = "";
    
    let hasVideo = false;
    let video = '';
    const videoRes = await fetch(URL_BASE + "/tv/" + id + "/videos?api_key=" + API_KEY + "&language=en-US");
    const videoJson = await videoRes.json();
    for (let element of videoJson.results) {
        if (element.type === "Trailer"){
            hasVideo=true;
            video="https://www." + element.site + ".com/embed/" + element.key;
        }
    }
    show = {
        title: element.original_name,
        tagline: tag,
        desc: element.overview,
        image: imgUrl,
        hasVideo: hasVideo,
        videoSrc: video
    }
    return show;
}

export interface PaginationModel {
    content: ItemModel[],
    maxPages: number,
}

export async function getMoviesByName(input: string, page: number): Promise<PaginationModel> {
    let films: ItemModel[] = [];
    const res = await fetch(URL_BASE + "/search/movie?api_key=" + API_KEY + "&language=en-US&query=" + input + "&page=" + page + "&include_adult=false");

    const json = await res.json();
    for (let element of json.results) {
        let film = { id: element.id, title: element.original_title, image: getPosterPath(element), type: "movie" };
        films.push(film);
    }
    return {content: films, maxPages: json.total_pages};
}

export async function getShowsByName(input: string, page: number): Promise<PaginationModel> {
    let series: ItemModel[] = [];
    const res = await fetch(URL_BASE + "/search/tv?api_key=" + API_KEY + "&language=en-US&query=" + input + "&page=" + page + "&include_adult=false");

    const json = await res.json();
    for (let element of json.results) {
        let show = { id: element.id, title: element.name, image: getPosterPath(element), type: "show" };
        series.push(show);
    }
    return {content: series, maxPages: json.total_pages};
}
