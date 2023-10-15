import { useState } from "react"
import BioOverlay from "./BioOverlay"



const HoverInfo = ({ item }) => {
    const [revealBio, setRevealBio] = useState(false)


    // items have multiple ratings but not all have the same -- put preference to rotten, them imdb, then metacritic -- if it doesn't have any than whatever else
    const genItemRating = (obj) => {
        const rottenScore = obj.Ratings.filter(x => x.Source === "Rotten Tomatoes")
        const imdbScore = obj.Ratings.filter(x => x.Source === "Internet Movie Database")
        const metaScore = obj.Ratings.filter(x => x.Source === "Metacritic")
        let scoreStr = ''
        if (rottenScore.length > 0) {
            scoreStr = `Rotten Tomatoes Score: ${rottenScore[0].Value}`
        } else if (imdbScore.length > 0) {
            scoreStr = `IMDB Score: ${imdbScore[0].Value}`
        } else if (metaScore.length > 0) {
            scoreStr = `Metacritic Score: ${metaScore[0].Value}`
        } else {
            return;
        }
        return scoreStr
    }

    let currRating = ''
    if (item.Ratings) {
        currRating = genItemRating(item)
    }

    let title = ''
    if (item.Type && item.Type !== 'N/A') {
        title = item.Type.charAt(0).toUpperCase() + item.Type.slice(1)
    }


    // console.log(revealBio)
    const bioHandler = () => {
        setRevealBio(true)
    }

    const closeBio = () => {
        setRevealBio(false)
    }






    return (

        <div className="info-container">
            {item.Title !== 'N/A' && <h3 className="movie-title">{item.Title}</h3>}
            {item.Director !== 'N/A' && <h4>Directed by: {item.Director}</h4>}
            {item.Year !== 'N/A' && <h4>Released: {item.Year}</h4>}
            {item.Rated !== 'N/A' && <h4>Rated: {item.Rated}</h4>}
            {title && <h4>Type: {title} </h4>}
            {currRating && <h4>{currRating}</h4>}
            <div onClick={bioHandler} className="hover-btn">Overview</div>
            <div className="hover-btn">More Information</div>
            <BioOverlay revealBio={revealBio} closeBio={closeBio} plot={item.Plot} />
        </div>

    )
}
export default HoverInfo;