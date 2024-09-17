import SearchTypeButtons from '../../../components/MainSearchSection/SearchTypeButtons'
import IsWatchedBtns from './IsWatchedBtns'

interface FilterContentOptionsProps {
    hideSlider: () => void;
    isWatched: string;
    setIsWatched: (isWatched: string) => void;
}

export default function FilterContentOptions({ isWatched, setIsWatched }: FilterContentOptionsProps) { 
    
    return (
        <>
            <SearchTypeButtons/>
            <IsWatchedBtns
                isWatched={isWatched}
                setIsWatched={setIsWatched}
            />
        </>
    )
}
