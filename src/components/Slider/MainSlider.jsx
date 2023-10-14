


import './MainSlider.css'
import Slider from './Slider';




const MainSlider = ({ types }) => {














    return (

        <div className="slider-container">
            <button className="handle left-handle " >
                <div className="arrow">‹</div>
            </button>

            <Slider types = {types}/>
            <button className="handle right-handle">
                <div className="arrow">›</div>
            </button>

        </div >
    )
}
export default MainSlider;