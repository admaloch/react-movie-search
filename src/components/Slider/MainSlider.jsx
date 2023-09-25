
import './MainSlider.css'


const MainSlider = () => {




    return (

        <div className="slider-container" style="display: flex; opacity: 1;">
            <button className="handle left-handle " style="opacity: 0;">
                <div className="arrow">‹</div>
            </button>
            <div className="slider" style="--slider-index: 0;">
                <div className="movie-container" data-id="tt0239395"><img src="" alt="movie image" /></div>


            </div>
            <button className="handle right-handle" style="opacity: 0;">
                <div className="arrow">›</div>
            </button>
        </div>




    )
}
export default MainSlider;