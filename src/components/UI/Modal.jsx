
import ReactDOM from 'react-dom';

import classNamees from './Modal.css';


// const portalElement = document.getElementById('overlays');

const Modal = ({ open, item, setIsModalOpen }) => {

    let modalStyle = open
        ? { display: 'flex', opacity: 100 }
        : { display: 'none', opacity: 0 }
    const year = new Date(item.Released).getFullYear()


    const searchLink = `https://www.google.com/search?q=${item.Title}+${year}`

    if (!open) return null

    return ReactDOM.createPortal(

        <div className="modal-overlay" style={modalStyle}>
            <div className="result-container">
                <div className="movie-info-container">
                    {item.Poster && <div className="movie-poster">
                        <img src={item.Poster} alt={`${item.Title} poster`} />
                    </div>}
                    <div className="movie-info">
                        {item.Title && <h3 className="movie-info-title">{item.Title}</h3>}
                        <ul className="movie-misc-info">
                            {item.Runtime && <li className="runTime movie-items"> <span>Runtime:</span> {item.Runtime} </li>}
                            {item.Rated && <li className="rated movie-items"> <span>Rated:</span> {item.Rated} </li>}
                            {item.Released && <li className="released movie-items"> <span>Released:</span> {year}</li>}
                        </ul>
                        {item.Genre && <p className="genre movie-items"><span>Genre:</span> {item.Genre}</p>}
                        {item.Director && <p className="writer movie-items"><span>Director:</span> {item.Director}</p>}
                        {item.Actors && <p className="actors movie-items"><span>Actors: </span>{item.Actors}</p>}
                        {item.Plot && <p className="plot movie-items"><span>Plot:</span>{item.Plot}</p>}
                        {item.Language && <p className="language movie-items"><span>Language:</span> {item.Language}</p>}
                       
                    </div>
                    
                </div>
                <div className="modal-buttons">
                            <button onClick={() => setIsModalOpen(false)} className="modal-btn" id="btn-close">Return to Search
                            </button>
                            <a
                                href={searchLink}
                                className="modal-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>Search</div>
                            </a>




                        </div>
            </div>

        </div >,
        document.getElementById('portal')




    );
};

export default Modal;
