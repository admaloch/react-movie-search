import ProgBar from "./ProgBar";

export default interface SliderContainerProps {
    increaseIndexHandler: () => void;
    decreaseIndexHandler: () => void;
    isSliderActive: Boolean;
    progBar: ProgBar[];
}