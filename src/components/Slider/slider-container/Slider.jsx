

import { useEffect, useState } from 'react';
import { useTheme } from '../../../store/APIContext';


import SliderItem from './SliderItem';



const Slider = () => {

    const [sliderRes, setSliderRes] = useState([])
    const { submittedSearch, searchRes } = useTheme()

    useEffect(
        function sliderResHandler() {
            setSliderRes(searchRes.Search)
        },
        [submittedSearch]
    );

    return (

        <div className="slider">
            {sliderRes && sliderRes.map(item => (
                <SliderItem
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