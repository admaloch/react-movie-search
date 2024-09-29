import React from 'react';
import SliderItem from './SliderItem';
import { useOmdbState } from '../../../hooks/useOmdbState';
import { OmdbItem } from '../../../models/ItemApiProps';



const Slider = (): JSX.Element => {

    const { omdbSearchResults} = useOmdbState()

    return (
        <div className="slider">
            {omdbSearchResults.map((item:OmdbItem) => (
                <SliderItem
                    key={item.imdbID}
                    item={item}
                />
            ))}
        </div>
    );
};
    
export default React.memo(Slider);
