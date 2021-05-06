import * as React from 'react';
import '../assets/css/ItemGrid.css';
import { Items, useItems } from '../context/ItemsContext';
import { getTopShows } from '../assets/util/Requests';
import Item from './Item';

const ItemGrid: React.FC = () => {
    
    let elements = useItems();

    React.useEffect(() => {
        if (elements.state.items.length === 0)
            getTopShows().then(
                series => elements.setItems(
                    (prevState: Items) =>{
                        return {...prevState,  items:series, topShows:series, option:'shows', searchActive:false}
                    }
                )
            );
    }, []);

    let gridElements = elements.state.items;

    return (
        <div className="Grid-background">
            {gridElements.map(item => {
                return <Item title={item.title} image={item.image} id={item.id} type={item.type} />
            })}
        </div>
    );

}

export default ItemGrid;