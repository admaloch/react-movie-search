
interface IsWatchedBtnsProps {
    isWatched: string;
    setIsWatched: (isWatched: string) => void;
}

export default function IsWatchedBtns({ isWatched, setIsWatched }: IsWatchedBtnsProps) {

    const btnHandler = (value: string) => {
        setIsWatched(value);
    };

    return (
        <ul id="result-type-container">
            <li
                className={`result-btn watched-btn ${isWatched === 'watched' ? 'active-btn' : ''}`}
                onClick={() => btnHandler('watched')}
            >
                Watched
            </li>
            <li
                className={`result-btn watched-btn ${isWatched === 'notWatched' ? 'active-btn' : ''}`}
                onClick={() => btnHandler('notWatched')}
            >
                Not watched
            </li>
            <li
                className={`result-btn watched-btn ${isWatched === 'both' ? 'active-btn' : ''}`}
                onClick={() => btnHandler('both')}
            >
                Both
            </li>
        </ul>
    );
}
