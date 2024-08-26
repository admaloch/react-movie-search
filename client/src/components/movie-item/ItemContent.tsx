import ItemInfo from './ItemInfo'
import BioOverlay from './BioOverlay'
import HoverInfoBtn from './HoverInfoBtn'
import { useState } from 'react'
import ItemContentProps from '../../models/ItemContentProps'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import ListItemModal from '../../features/movie-api/ItemModal/ListItemModal'

export default function ItemContent({ item }: ItemContentProps): JSX.Element {

    const [revealBio, setRevealBio] = useState(false)

    const openBioOverlay = () => {
        setRevealBio(true)
    }

    const closeBioOverlay = () => {
        setRevealBio(false)
    }



    return (
        <>
            <ItemInfo
                closeBioOverlay={closeBioOverlay}
                item={item}
            />

            <div className="hover-btn-container">
                {item.Plot !== 'N/A'
                    && <HoverInfoBtn openBioOverlay={openBioOverlay} />
                }


                <ListItemModal
                    imdbId={item.imdbID}
                >
                    <MoreHorizSharpIcon className='popover-icon' sx={{ fontSize: 30 }} />
                </ListItemModal>
            </div>

            <BioOverlay
                revealBio={revealBio}
                closeBio={closeBioOverlay}
                plot={item.Plot}
            />
        </>
    )
}
