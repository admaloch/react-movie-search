import ProgBar from "./ProgBar";

export default interface ProgressBarProps {
    progBar: ProgBar[];
    changeIndexHandler: (newIndex: number) => void;
}