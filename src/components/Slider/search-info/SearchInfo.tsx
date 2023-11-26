import React from "react"
import "./SearchInfo.css"
import {randomColorGen} from '../../../utility/utility'
import { useAPIContext } from "../../../store/APIContext/APIContext"
import ProgressBar from "./ProgressBar"
import { useEffect } from "react"
import { useTypeContext } from "../../../store/searchTypeContext/TypeContext"
import { SearchInfoProps } from "../../../models/SearchInfoProps"


const SearchInfo = ({ progBar, isSliderActive, setProgBar, sliderIndex, changeIndexHandler }: SearchInfoProps): JSX.Element => {
    const { currType } = useTypeContext()
    const { submittedSearch, apiResults } = useAPIContext()
    let lightOrDarkText = currType.type === 'Movie' ? 'light' : 'dark'
    const spanColor = { color: randomColorGen(lightOrDarkText) }
    const currSearch = submittedSearch.charAt(0).toUpperCase() + submittedSearch.slice(1)

    useEffect(
        function progressBarFunc() {
            let itemsPerScreen = 5
            const sliderElement = document.querySelector('.slider');
            if (sliderElement) {
                const images = getComputedStyle(sliderElement).getPropertyValue('--images-per-screen');
                itemsPerScreen = parseInt(images.trim())
            }
            const numItems = apiResults?.length
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

const headerStyle = isSliderActive 
? {opacity: 1, height: '100%'}
: {opacity: 0, height: '0'}


    return (

        <div style={headerStyle} className="header-info">
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