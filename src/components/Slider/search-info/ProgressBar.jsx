import { useTheme } from "../../../store/APIContext"
import { useEffect, useState } from "react";
import ProgressItem from "./ProgressItem";

const ProgressBar = ({ sliderIndex }) => {

    const [progBar, setProgBar] = useState(0)
    const { submittedSearch, searchRes } = useTheme()

    useEffect(
        function progressBarFunc() {
            const itemsPerScreen = parseInt(getComputedStyle(document.querySelector('.slider')).getPropertyValue('--images-per-screen'))
            const numItems = searchRes.Search && searchRes.Search.length
            const numBlocks = Math.ceil(numItems / itemsPerScreen)
            let blockArr = []
            for (let i = 0; i < numBlocks; i++) {
                blockArr.push({ id: i, isActive: false })
            }
            blockArr[sliderIndex] = { id: sliderIndex, isActive: true }
            setProgBar(blockArr)
        },
        [submittedSearch, sliderIndex]
    );

    return (
        <div className="progress-bar">
            {progBar && progBar.map(item => (
                <ProgressItem
                    key={item.id}
                    id={item.id}
                    isActive={item.isActive}
                />
            ))}
        </div>
    )
}
export default ProgressBar;