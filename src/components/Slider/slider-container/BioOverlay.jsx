import { useState } from "react";


const BioOverlay = ({ plot, revealBio, closeBio }) => {



    const bioClass = revealBio ? `bio-overlay show-bio` : 'bio-overlay'

    return (

        <div className={bioClass}>
            <h4>Overview</h4>
            <p>{plot}</p>
            <div onClick={closeBio} className="close-bio-text"></div>
        </div>

    )
}
export default BioOverlay;