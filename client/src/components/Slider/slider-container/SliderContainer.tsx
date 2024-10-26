import { useEffect } from 'react';
import { useState } from 'react';
import Slider from '../../../features/movie-api/slider-item/Slider';
import './Slider.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useOmdbState } from '../../../hooks/useOmdbState';
import ProgBar from '../../../models/ProgBar';

interface SliderContainerProps {
    increaseIndexHandler: () => void;
    decreaseIndexHandler: () => void;
    isSliderActive: Boolean;
    progBar: ProgBar[];
}

const SliderContainer = ({ increaseIndexHandler, decreaseIndexHandler, isSliderActive, progBar }: SliderContainerProps): JSX.Element => {

    const { submittedSearch } = useOmdbState()

    const [showArrows, setShowArrows] = useState(true)
    const arrowStyle = { opacity: showArrows ? 1 : 0 }

    const showArrowHandler = () => {
        setShowArrows(true)

    }
    const hideArrowHandler = () => {
        setShowArrows(false)
    }

    const sliderClass = isSliderActive
        ? 'show-slider slider-container'
        : 'remove-slider slider-container'

    useEffect(
        function hideArrowsOnSmallRequests() {
            if (progBar.length > 1) {
                setShowArrows(true)
            } else {
                setShowArrows(false)
            }
        },
        [progBar]
    )

    return (
        <section className={sliderClass}>
            <button id='left-arrow'
                style={arrowStyle}
                onClick={decreaseIndexHandler}
                className="handle left-handle" aria-label='decrease items'>
                <div  aria-labelledby='left-arrow' className="arrow">
                    <ArrowBackIcon aria-labelledby='left-arrow' className='arrow-icon' sx={{ fontSize: '3rem' }} />
                </div>
            </button>
            {submittedSearch &&
                <Slider
                    showArrowFunc={showArrowHandler}
                    hideArrowFunc={hideArrowHandler}
                />
            }

            <button
                id='right-arrow'
                style={arrowStyle}
                aria-label='increase items'
                onClick={increaseIndexHandler}
                className="handle right-handle">
                <div aria-labelledby='right-arrow' className="arrow">
                    <ArrowForwardIcon aria-labelledby='right-arrow' className='arrow-icon' sx={{ fontSize: '3rem' }} />
                </div>
            </button>
        </section >
    )
}

export default SliderContainer;
