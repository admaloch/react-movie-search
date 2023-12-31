import ItemInfo from './ItemInfo'
import MoreInfoBtn from './MoreInfoBtn'
import BioOverlay from './BioOverlay'
import HoverInfoBtn from "./ShowPlotBtn"
import { useState } from 'react'
import ItemContentProps from '../../../models/ItemContentProps'

export default function ItemContent({ item, openItemModal }: ItemContentProps): JSX.Element {

    const [revealBio, setRevealBio] = useState(false)

    const openBioOverlay = () => {
        console.log('open bio overlay ran')
        setRevealBio(true)
    }

    const closeBioOverlay = () => {
        console.log('close bio overlay ran')
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
                <MoreInfoBtn openItemModal={openItemModal} />
            </div>

            <BioOverlay
                revealBio={revealBio}
                closeBio={closeBioOverlay}
                plot={item.Plot}
            />
        </>
    )
}
