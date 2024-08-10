import { ColorScheme } from "../features/search-options/SearchTypeOptions"

export interface SliderProps {
    hideSlider: () => void;
}

export interface MainSearchProps extends SliderProps {
    isSliderActive: Boolean;
}

export interface MainSliderProps extends MainSearchProps {
    showSlider: () => void;
}

export interface SearchTypeBtnProps extends SliderProps {
    type: string;
    isActive: Boolean;
    colorScheme: ColorScheme;
}