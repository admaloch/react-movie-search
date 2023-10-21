
import ReactDOM from 'react-dom';

import classes from './Modal.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

// modal mockup

{ <div id="modal" style="display: flex; opacity: 1;">
            <div class="overlay">
                <div class="result-container">
                    <div class="movie-info-container">
                        <div class="movie-poster">
                            <img src="https://m.media-amazon.com/images/M/MV5BMjEyNzQ0NzM4MV5BMl5BanBnXkFtZTgwMDI0ODM2OTE@._V1_SX300.jpg" alt="movie poster">
                        </div>
                        <div class="movie-info">
                            <h3 class="movie-info-title">War Dogs</h3>
                            <ul class="movie-misc-info">   
                                <li class="runTime movie-items"> <span>Runtime:</span> 114 min </li>
                                <li class="rated movie-items"> <span>Rated:</span> R </li>
                                <li class="released movie-items"> <span>Released:</span> 2016</li>
                            </ul>
                            <p class="genre movie-items"><span>Genre:</span> Biography, Comedy, Crime</p>
                            <p class="writer movie-items"><span>Director:</span> Todd Phillips</p>
                            <p class="actors movie-items"><span>Actors: </span>Jonah Hill, Miles Teller, Steve Lantz</p>
                            <p class="plot movie-items"><span>Plot:</span> In 2005, .....</p>
                            <p class="language movie-items"><span>Language:</span> English, Arabic, Albanian, Romanian</p>
                            <div class="modal-buttons">
                                <button class="modal-btn" id="btn-close">Return to Search</button>
                                <a class="modal-btn" href="https://www.google.com/search?q=War Dogs+2016" target="_blank">
                                <div>Search</div>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
    </div> }
