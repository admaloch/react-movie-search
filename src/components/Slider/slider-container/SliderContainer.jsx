import { useState } from 'react';
import Slider from './Slider';
import './Slider.css'
const SliderContainer = ({ increaseIndexHandler, decreaseIndexHandler, isSliderActive }) => {

    const [showArrows, setShowArrows] = useState(true)

    const arrowStyle = { opacity: showArrows ? 1 : 0 }
    const hideArrows = () => setShowArrows(false)
    const revealArrows = () => setShowArrows(true)

    return (

        <div

            style={{ opacity: isSliderActive ? 1 : 0 }}
            className="slider-container">
            <button
                onMouseEnter={revealArrows}
                style={arrowStyle}
                onClick={decreaseIndexHandler}
                className="handle left-handle " >
                <div className="arrow">‹</div>
            </button>
            <Slider
                hideArrows={hideArrows}
                revealArrows={revealArrows}
            />
            <button
                onMouseEnter={revealArrows}
                style={arrowStyle}
                onClick={increaseIndexHandler}
                className="handle right-handle">
                <div className="arrow">›</div>
            </button>
        </div >
    )
}
export default SliderContainer;