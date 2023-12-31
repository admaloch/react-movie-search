import { APIItem } from '../../../models/ItemApiProps'
import ItemInfoProps from '../../../models/ItemInfoProps'

export default function ItemInfo({ item, closeBioOverlay }: ItemInfoProps): JSX.Element {

    // not all items have same ratings or any at all
    //preference... 1 rotten, 2 imbd, 3 metacritic, 4 null
    const genItemRating = (obj: APIItem): string | undefined => {
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

    let currRating: string | undefined

    if (item.Ratings) {
        currRating = genItemRating(item)
    }

    let itemType
    if (item.Type && item.Type !== 'N/A') {
        itemType = item.Type.charAt(0).toUpperCase() + item.Type.slice(1)
    } else {
        itemType = null
    }



    return (
        <div
            className='item-info'
            onMouseEnter={closeBioOverlay}
            onTouchEnd={closeBioOverlay}

        >
            {item.Title !== 'N/A' &&
                <div className="title-container">
                    <h3>{item.Title}</h3>
                </div>
            }
            {item.Director !== 'N/A' && <h4>Directed by: {item.Director}</h4>}
            {item.Year !== 'N/A' && <h4>Released: {item.Year}</h4>}
            {item.Rated !== 'N/A' && <h4>Rated: {item.Rated}</h4>}
            {itemType && <h4>Type: {itemType} </h4>}
            {currRating && <h4>{currRating}</h4>}
        </div>
    )
}
