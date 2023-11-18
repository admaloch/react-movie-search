export interface ProgBar {
    id: number;
    isActive: Boolean;
}

export interface SliderIndexState {
    progBar: ProgBar[];
    index: number;
}

interface IncrementType {
    type: 'increment';
}
interface DecrementType {
    type: 'decrement';
}
interface ChangeIndexType {
    type: 'changeIndex';
    newIndex: number;
}
interface UpdateProgType {
    type: 'updateProgBar';
    progBarArr: ProgBar[];
}

export type SliderActions = IncrementType| DecrementType| ChangeIndexType| UpdateProgType;

