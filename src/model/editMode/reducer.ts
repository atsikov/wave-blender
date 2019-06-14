import { EditModeState, initialEditModeState } from "./EditMode";
import { EDIT_MODE_SET, EditModeAction } from "./actions";

export function editModeReducer(state: EditModeState = initialEditModeState, action: EditModeAction): EditModeState {
    switch (action.type) {
        case EDIT_MODE_SET: {
            return {
                ...state,
                mode: action.payload.mode,
            };
        }

        default:
            return state;
    }
}
