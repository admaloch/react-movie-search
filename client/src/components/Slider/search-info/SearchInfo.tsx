import React from "react"
import "./SearchInfo.css"
import { randomColorGen } from '../../../utility/utility'
import ProgressBar from "./ProgressBar"
import { useEffect } from "react"
import { useSearchType } from "../../../hooks/useSearchType"
import { SearchInfoProps } from "../../../models/SearchInfoProps"
import { useOmdbState } from "../../../hooks/useOmdbState"

const SearchInfo = ({ progBar, isSliderActive, setProgBar, sliderIndex, changeIndexHandler }: SearchInfoProps): JSX.Element => {
   
    const { currType } = useSearchType()
    const { submittedSearch, omdbSearchResults } = useOmdbState()

    currType = currType as SearchType
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    const spanColor = { color: randomColorGen(lightOrDarkText) }

    const currSearch = submittedSearch

    useEffect(
        function progressBarFunc() {
            let itemsPerScreen = 5
            const sliderElement = document.querySelector('.slider');
            if (sliderElement) {
                const images = getComputedStyle(sliderElement).getPropertyValue('--images-per-screen');
                itemsPerScreen = parseInt(images.trim())
            }
            const numItems = omdbSearchResults?.length
            const numOfBlocks = Math.ceil(numItems / itemsPerScreen)
            let blockArr = []
            for (let i = 0; i < numOfBlocks; i++) {
                blockArr.push({ id: i, isActive: false })
            }
            blockArr[sliderIndex] = { id: sliderIndex, isActive: true }
            setProgBar(blockArr)
        },
        [submittedSearch, sliderIndex]
    );

    const headerClass = isSliderActive
        ? 'header-info show-header'
        : 'header-info remove-header'

    return (
        <div className={headerClass}>
            <h2>{currType.description} about: <span style={spanColor}>{currSearch}</span>
            </h2>
            <ProgressBar
                progBar={progBar}
                changeIndexHandler={changeIndexHandler}
            />
        </div>
    )
}
export default React.memo(SearchInfo);