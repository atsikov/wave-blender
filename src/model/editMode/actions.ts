import { createAction } from "typesafe-actions";
import { EditMode } from "./EditMode";

export const EDIT_MODE_SET = "editModeSet";

export const editModeSet = createAction(EDIT_MODE_SET, action => (mode: EditMode) => action({ mode }));

export type EditModeAction =
    | ReturnType<typeof editModeSet>;
