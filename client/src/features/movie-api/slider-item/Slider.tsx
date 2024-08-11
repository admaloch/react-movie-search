import React from 'react';
import SliderItem from './SliderItem';
import SlidersProps from '../../../models/SlidersProps';

import { useOmdbState } from '../../../hooks/useOmdbState';

const Slider = ({ showArrowFunc, hideArrowFunc }: SlidersProps): JSX.Element => {

    const { omdbSearchResults} = useOmdbState()

    console.log(omdbSearchResults.Search)

    return (
        <div className="slider">
            {Array.isArray(omdbSearchResults) && omdbSearchResults.map(item => (
                <SliderItem
                    key={item.imdbID}
                    item={item}
                    showArrowFunc={showArrowFunc}
                    hideArrowFunc={hideArrowFunc}
                />
            ))}
        </div>
    );
};
    
export default React.memo(Slider);
