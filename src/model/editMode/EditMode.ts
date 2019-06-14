export interface EditModeState {
    mode: EditMode;
}

export enum EditMode {
    Move = "Move",
    Slice = "Slice",
}

export const initialEditModeState: EditModeState = {
    mode: EditMode.Move,
};
