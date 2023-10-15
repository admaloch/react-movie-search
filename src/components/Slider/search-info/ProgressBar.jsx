
import ProgressItem from "./ProgressItem";

const ProgressBar = ({progBar}) => {



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