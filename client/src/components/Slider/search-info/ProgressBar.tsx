import ProgressItem from "./ProgressItem";
import ProgressBarProps from "../../../models/ProgressBar";

const ProgressBar = ({ progBar, changeIndexHandler }: ProgressBarProps):JSX.Element => {
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


