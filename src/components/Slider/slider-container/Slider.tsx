
import React from 'react';
import { useEffect, useState } from 'react';
import { useAPIContext } from '../../../store/APIContext/APIContext';
import SliderItem from './SliderItem';
import SlidersProps from '../../../models/SlidersProps';
import { APIResults } from '../../../store/APIContext/APIContextInterface';

const Slider = ({ mouseEnter, mouseLeave, mobileTouch, mobileLeave }: SlidersProps): JSX.Element => {

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
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onTouchStart={mobileTouch}
            onTouchEnd={mobileLeave}
        >
            {sliderRes.map(item => (
                <SliderItem
                    poster={item.Poster}
                    imdbID={item.imdbID}
                    key={item.imdbID}
                />
            ))}
        </div>
    )
}
export default React.memo(Slider);