import ProgBar from "./ProgBar";

export interface SearchInfoProps {
    progBar: ProgBar[];
    isSliderActive: Boolean;
    setProgBar: (progBarArr: ProgBar[]) => void;
    sliderIndex: number;
    changeIndexHandler: (newIndex: number) => void;
}