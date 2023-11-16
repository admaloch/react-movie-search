export interface ProgBar {
    id: number;
    isActive: Boolean;
}

export interface SliderIndexState {
    progBar: ProgBar[];
     index: number;
}

export interface SliderAction {
    type: 'string';
    action: ProgBar[];
}