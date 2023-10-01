
import './MainSlider.css'
// import image from '../../assets/image_not_found.png'
import image from '../../assets/image_not_found.png'

const MainSlider = () => {




    return (

        <div className="slider-container">
            <button className="handle left-handle " >
                <div className="arrow">‹</div>
            </button>


            <div className="movie-container" data-id="">
                <img src={image} alt=""></img>
                <div className="info-container">
                    <h3 className="movie-title">War Dogs</h3>
                    <h4>Directed by: Todd Phillips</h4>
                    <h4>Released: 2016</h4>
                    <h4>Rated: R</h4>
                    <h4>Type: Movie </h4>
                    <h4>Rotten Tomatoes Score: 61%</h4>
                    <div className="hover-btn">Overview</div>
                    <div className="hover-btn">More Information</div>
                </div>
                <div className="bio-overlay">
                    <h4>Overview</h4>
                    <p>In 2005.....</p>
                    <div className="close-bio-text"></div>
                </div>
            </div>
            <div className="movie-container" data-id="">
                <img src={image} alt=""></img>
                <div className="info-container">
                    <h3 className="movie-title">War Dogs</h3>
                    <h4>Directed by: Todd Phillips</h4>
                    <h4>Released: 2016</h4>
                    <h4>Rated: R</h4>
                    <h4>Type: Movie </h4>
                    <h4>Rotten Tomatoes Score: 61%</h4>
                    <div className="hover-btn">Overview</div>
                    <div className="hover-btn">More Information</div>
                </div>
                <div className="bio-overlay">
                    <h4>Overview</h4>
                    <p>In 2005.....</p>
                    <div className="close-bio-text"></div>
                </div>
            </div>
            <div className="movie-container" data-id="">
                <img src={image} alt=""></img>
                <div className="info-container">
                    <h3 className="movie-title">War Dogs</h3>
                    <h4>Directed by: Todd Phillips</h4>
                    <h4>Released: 2016</h4>
                    <h4>Rated: R</h4>
                    <h4>Type: Movie </h4>
                    <h4>Rotten Tomatoes Score: 61%</h4>
                    <div className="hover-btn">Overview</div>
                    <div className="hover-btn">More Information</div>
                </div>
                <div className="bio-overlay">
                    <h4>Overview</h4>
                    <p>In 2005.....</p>
                    <div className="close-bio-text"></div>
                </div>
            </div>
            <div className="movie-container" data-id="">
                <img src={image} alt=""></img>
                <div className="info-container">
                    <h3 className="movie-title">War Dogs</h3>
                    <h4>Directed by: Todd Phillips</h4>
                    <h4>Released: 2016</h4>
                    <h4>Rated: R</h4>
                    <h4>Type: Movie </h4>
                    <h4>Rotten Tomatoes Score: 61%</h4>
                    <div className="hover-btn">Overview</div>
                    <div className="hover-btn">More Information</div>
                </div>
                <div className="bio-overlay">
                    <h4>Overview</h4>
                    <p>In 2005.....</p>
                    <div className="close-bio-text"></div>
                </div>
            </div>
            <div className="movie-container" data-id="">
                <img src={image} alt=""></img>
                <div className="info-container">
                    <h3 className="movie-title">War Dogs</h3>
                    <h4>Directed by: Todd Phillips</h4>
                    <h4>Released: 2016</h4>
                    <h4>Rated: R</h4>
                    <h4>Type: Movie </h4>
                    <h4>Rotten Tomatoes Score: 61%</h4>
                    <div className="hover-btn">Overview</div>
                    <div className="hover-btn">More Information</div>
                </div>
                <div className="bio-overlay">
                    <h4>Overview</h4>
                    <p>In 2005.....</p>
                    <div className="close-bio-text"></div>
                </div>
            </div>
            



            <button className="handle right-handle">
                <div className="arrow">›</div>
            </button>


        </div >




    )
}
export default MainSlider;