import React, { useEffect } from 'react';
import { useState } from 'react';
import Slider from './Slider';
import './Slider.css'
import SliderContainerProps from '../../../models/SliderContainerProps';

const SliderContainer = ({ increaseIndexHandler, decreaseIndexHandler, isSliderActive, progBar }: SliderContainerProps): JSX.Element => {

    const [showArrows, setShowArrows] = useState(true)
    const arrowStyle = { opacity: showArrows ? 1 : 0 }
    const hideArrows = () => setShowArrows(false)
    const revealArrows = () => {
        if (progBar.length > 1) {
            setShowArrows(true)
        }
    }

    const handleSliderMouseEnter = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        // Check if the mouse is over the slider item or the arrows
        if (target.classList.contains('handle')) {
            setShowArrows(true);
        } else {
            setShowArrows(false);
        }
    };

    const handleSliderMouseLeave = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        // Check if the mouse is over the slider item or the arrows
        if (!target.classList.contains('slider-item')) {
            setShowArrows(true);
        }
    };

    const containerStyle = isSliderActive
        ? { opacity: 1, height: 'auto' }
        : { opacity: 0, height: '0' }

    useEffect(
        function hideArrowsOnSmallRequests() {
            if (progBar.length > 1) {
                revealArrows()
            } else {
                hideArrows()
            }
        },
        [progBar]
    )

    return (

        <div

            style={containerStyle}
            className="slider-container">
            <button
                onMouseEnter={handleSliderMouseEnter}
                onMouseLeave={handleSliderMouseLeave}

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
                onMouseEnter={handleSliderMouseEnter}
                onMouseLeave={handleSliderMouseLeave}

                style={arrowStyle}
                onClick={increaseIndexHandler}
                className="handle right-handle">
                <div className="arrow">›</div>
            </button>
        </div >
    )
}
export default SliderContainer;