


import { useState } from 'react';
import './MainSlider.css'
import Slider from './Slider';




const MainSlider = ({ types }) => {

    const [sliderIndex, setSliderIndex] = useState(0)

    const decreaseIndexHandler = () => {
        setSliderIndex(sliderIndex - 1)
        document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex - 1);
    }
    const increaseIndexHandler = () => {
        setSliderIndex(sliderIndex + 1)
        document.querySelector('.slider').style.setProperty('--slider-index', sliderIndex + 1);
    }












    return (

        <div className="slider-container">
            <button onClick={decreaseIndexHandler} className="handle left-handle " >
                <div className="arrow">‹</div>
            </button>

            <Slider types={types} />
            <button onClick={increaseIndexHandler} className="handle right-handle">
                <div className="arrow">›</div>
            </button>

        </div >
    )
}
export default MainSlider;