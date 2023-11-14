
import React from 'react';
import { useEffect, useState } from 'react';
import { useAPIContext } from '../../../store/APIContext/APIContext';


import SliderItem from './SliderItem';



const Slider = ({ hideArrows, revealArrows }) => {

    const [sliderRes, setSliderRes] = useState([])
    const { submittedSearch, apiResults } = useAPIContext()

    useEffect(
        function sliderResHandler() {
            setSliderRes(apiResults)
        },
        [submittedSearch]
    );



    return (

        <div className="slider">
            {sliderRes && sliderRes.map(item => (
                <SliderItem
                    hideArrows={hideArrows}
                    revealArrows={revealArrows}
                    item={item}
                    poster={item.Poster}
                    imdbID={item.imdbID}
                    key={item.imdbID}

                />
            ))}
        </div>
    )
}
export default React.memo(Slider);