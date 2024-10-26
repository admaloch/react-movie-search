import ProgBar from "../../../models/ProgBar";
import ProgressItem from "./ProgressItem";

interface ProgressBarProps {
    progBar: ProgBar[];
    changeIndexHandler: (newIndex: number) => void;
}

const ProgressBar = ({ progBar, changeIndexHandler }: ProgressBarProps):JSX.Element => {
    return (
        <div id="progress-bar" className="progress-bar">
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

