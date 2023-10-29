


const BioOverlay = ({ plot, revealBio, closeBio }) => {

    const bioClass = revealBio ? `bio-overlay show-bio` : 'bio-overlay'

    let styles = revealBio
        ? { opacity: '1', height: '100%' }
        : {  opacity: '0', height: '0' }


    return (

        <div style={styles} className='bio-overlay'>
            <h4>Overview</h4>
            <p>{plot}</p>
            <div onClick={closeBio} className="close-bio-text"></div>
        </div>

    )
}
export default BioOverlay;