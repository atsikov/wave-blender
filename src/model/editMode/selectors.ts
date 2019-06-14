import { State } from "../interface";
import { EditModeState, EditMode } from "./EditMode";

export function selectEditModeState(state: State): EditModeState {
    return state.editMode;
}

export function selectEditMode(state: EditModeState): EditMode {
    return state.mode;
}