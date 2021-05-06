import * as React from 'react';
import { useHistory } from 'react-router';
import '../assets/css/Item.css';

export interface ItemProps {
    id: number,
    image: string,
    title: string,
    type: string,
}

const Item = (props: ItemProps) => {

    let history = useHistory();

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.type === "movie") {
            history.push("/movie/" + props.id)
        } else {
            history.push("/show/" + props.id)
        }
    }

    return (
        <div className="Item-card" onClick={handleItemClick}>
            <img className="Item-img" src={props.image} alt={props.title}></img>
            <div className="Item-heading">{props.title}</div>
        </div>
    );
}

export default Item;