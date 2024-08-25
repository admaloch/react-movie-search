import SearchTypeButtons from '../../../components/MainSearchSection/SearchTypeButtons'
import IsWatchedBtns from './IsWatchedBtns'

export default function FilterContentOptions({ hideSlider, isWatched, setIsWatched }) {
    
    return (
        <>
            <SearchTypeButtons hideSlider={hideSlider} />
            <IsWatchedBtns
                isWatched={isWatched}
                setIsWatched={setIsWatched}
            />
        </>

    )
}
