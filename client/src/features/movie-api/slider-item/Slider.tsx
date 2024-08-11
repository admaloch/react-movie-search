import React from 'react';
import SliderItem from './SliderItem';
import SlidersProps from '../../../models/SlidersProps';

import { useOmdbState } from '../../../hooks/useOmdbState';

const Slider = ({ showArrowFunc, hideArrowFunc }: SlidersProps): JSX.Element => {

    const { omdbSearchResults } = useOmdbState()









    return (
        <div
            className="slider"
        >
            {
                omdbSearchResults?.Search.map(item => (
                    <SliderItem
                        item={item}
                        key={item.imdbID}
                        showArrowFunc={showArrowFunc}
                        hideArrowFunc={hideArrowFunc}
                    />
                ))
            }

        </div>
    )
}
export default React.memo(Slider);
