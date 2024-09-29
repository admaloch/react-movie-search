
import Slider from '../../../features/movie-api/slider-item/Slider';
import './Slider.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useOmdbState } from '../../../hooks/useOmdbState';

interface SliderContainerProps {
    increaseIndexHandler: () => void;
    decreaseIndexHandler: () => void;
    isSliderActive: Boolean;
}

const SliderContainer = ({ increaseIndexHandler, decreaseIndexHandler, isSliderActive }: SliderContainerProps): JSX.Element => {

    const { submittedSearch } = useOmdbState()

 

    const sliderClass = isSliderActive
        ? 'show-slider slider-container'
        : 'remove-slider slider-container'



    return (
        <div className={sliderClass}>
            <button
                onClick={decreaseIndexHandler}
                className="handle left-handle" >
                <div className="arrow">
                    <ArrowBackIcon className='arrow-icon' sx={{ fontSize: '3rem' }} />
                </div>
            </button>
            {submittedSearch &&
                <Slider />
            }

            <button
    
                onClick={increaseIndexHandler}
                className="handle right-handle">
                <div className="arrow">
                    <ArrowForwardIcon className='arrow-icon' sx={{ fontSize: '3rem' }} />
                </div>
            </button>
        </div >
    )
}

export default SliderContainer;
