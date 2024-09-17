import React from 'react';
import SliderItem from './SliderItem';
import SlidersProps from '../../../models/SlidersProps';

import { useOmdbState } from '../../../hooks/useOmdbState';
import { OmdbItem } from '../../../models/ItemApiProps';

const Slider = ({ showArrowFunc, hideArrowFunc }: SlidersProps): JSX.Element => {

    const { omdbSearchResults} = useOmdbState()



    return (
        <div className="slider">
            {omdbSearchResults.map((item:OmdbItem) => (
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
