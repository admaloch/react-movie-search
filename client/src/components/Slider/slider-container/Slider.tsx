import React from 'react';
import { useEffect, useState } from 'react';
import { useAPIContext } from '../../../store/APIContext/APIContext';
import SliderItem from './SliderItem';
import SlidersProps from '../../../models/SlidersProps';
import { APIResults } from '../../../store/APIContext/APIContextInterface';

const Slider = ({ showArrowFunc, hideArrowFunc }: SlidersProps): JSX.Element => {

    const [sliderRes, setSliderRes] = useState<APIResults[]>([])
    const { submittedSearch, apiResults } = useAPIContext()

    useEffect(
        function sliderResHandler() {
            setSliderRes(apiResults)
        },
        [submittedSearch]
    );

    return (
        <div
            className="slider"
        >
            {sliderRes.map(item => (
                <SliderItem
                    poster={item.Poster}
                    imdbID={item.imdbID}
                    key={item.imdbID}
                    showArrowFunc={showArrowFunc}
                    hideArrowFunc={hideArrowFunc}
                />
            ))}
        </div>
    )
}
export default React.memo(Slider);
