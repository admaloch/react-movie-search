import { useTheme } from "../../../store/APIContext"
import { useEffect, useState } from "react";
import ProgressItem from "./ProgressItem";


const ProgressBar = ({ sliderIndex }) => {
    const [numProgBar, setNumProgBar] = useState(0)
    const { submittedSearch, searchRes } = useTheme()

    useEffect(
        function progressBarFunc() {
            const itemsPerScreen = parseInt(getComputedStyle(document.querySelector('.slider')).getPropertyValue('--images-per-screen'))
            const numItems = searchRes.Search && searchRes.Search.length
            const numBlocks = Math.ceil(numItems / itemsPerScreen)
            setNumProgBar(numBlocks)
            let blockArr = []
            for (let i = 0; i < numBlocks; i++) {
                blockArr.push({ isActive: false })
            }
            blockArr[sliderIndex] = { isActive: true }
            console.log(blockArr)
        },
        [submittedSearch]
    );

    const rows = [];
    for (let i = 0; i < numProgBar; i++) {
        rows.push(<ProgressItem key={i} />);
    }

    return (
        <div className="progress-bar">
            {rows.map(item => item)}
        </div>
    )
}
export default ProgressBar;