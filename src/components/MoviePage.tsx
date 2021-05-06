import '../assets/css/MoviePage.css';
import '../assets/css/Home.css';
import NavButton from './NavButton'
import { getMovieDetails, getShowDetails } from '../assets/util/Requests';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router';

export interface CardItem {
    title: string,
    tagline: string,
    desc: string,
    image: string,
    hasVideo: boolean,
    videoSrc: string,
}

export interface MoviePageParams {
    isMovieParam: string,
    idParam: string,
}

const MoviePage = () => {

    const [card, setCard] = useState<CardItem>(
        { title: '', tagline: '', desc: '', image: '', hasVideo: false, videoSrc: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const { isMovieParam, idParam } = useParams<MoviePageParams>();
    let id = parseInt(idParam);

    useEffect(() => {
        if (isMovieParam === "movie") {
            getMovieDetails(id).then((c) => {
                setCard(c);
                setLoading(false);
            })
        } else {
            getShowDetails(id).then((c) => {
                setCard(c);
                setLoading(false);
            })
        }
    }, []);

    if (loading) {
        return <Loader />
    } else
        return (
            <div >
                <div className="Home-buttons">
                    <NavButton buttonStyle="Movie-button" content="&lt;&lt; &nbsp; Back" page="singleItem" />
                    <br />
                </div>
                <div className="Movie-content">
                    {card.hasVideo ?
                        <iframe src={card.videoSrc} title={card.title + " (Trailer)"} className="Movie-img-video"></iframe>
                        :
                        <img src={card.image} alt={card.title} className="Movie-img-video"></img>}
                    <div className="Movie-text">
                        <h2> {card.title} </h2>
                        <h3> {card.tagline} </h3>
                        <p> {card.desc} </p>
                    </div>
                </div>
            </div>
        );
}

export default MoviePage;