
import ProgressItem from "./ProgressItem";

const ProgressBar = ({ progBar, changeIndexHandler }) => {



    // console.log(progBar)

    return (
        <div className="progress-bar">
            {progBar && progBar.map(item => (
                <ProgressItem
                    key={item.id}
                    id={item.id}
                    isActive={item.isActive}
                    changeIndexHandler={changeIndexHandler}
                />
            ))}
        </div>
    )
}
export default ProgressBar;


