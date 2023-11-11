import { ColorScheme } from "../store/searchTypeContext/SearchTypeOptions"

export interface SliderProps {
    hideSlider: () => void;
}

export interface MainSearchProps extends SliderProps {
    isSliderActive: Boolean;
}

export interface SearchTypeBtnProps extends SliderProps {
    type: string;
    isActive: Boolean;
    colorScheme: ColorScheme;
}