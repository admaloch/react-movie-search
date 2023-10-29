import { useRef } from "react";



const BioOverlay = ({ plot, revealBio, closeBio }) => {
    const scrollDiv = useRef(null);
    const bioClass = revealBio ? `bio-overlay show-bio` : 'bio-overlay'

    const mouseLeaveHandler = () => {
        scrollToTop()
        closeBio()
    }

    const scrollToTop = () => {
        scrollDiv.current.scroll({
            top: 0,
            behavior: "smooth"
        });
    };

    let styles = revealBio
        ? { opacity: '1', height: '100%' }
        : { opacity: '0', height: '0' }


    return (

        <div
            ref={scrollDiv}
            onMouseLeave={mouseLeaveHandler}
            style={styles}
            className='bio-overlay'>
            <h4>Overview</h4>
            <p>{plot}</p>
            <div onClick={closeBio} className="close-bio-text"></div>
        </div>

    )
}
export default BioOverlay;