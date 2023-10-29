

import { useEffect, useState } from 'react';
import { useTheme } from '../../../store/APIContext';


import SliderItem from './SliderItem';



const Slider = ({ hideArrows, revealArrows }) => {

    const [sliderRes, setSliderRes] = useState([])
    const { submittedSearch, apiResults } = useTheme()

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
export default Slider;