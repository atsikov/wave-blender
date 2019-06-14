import { action, createAction } from "typesafe-actions";
import { AudioBufferId, CueId } from "../globalId";

export const CUE_ADD = "cueAdd";
export const CUE_REMOVE = "cueRemove";
export const CUE_COPY = "cueCopy";
export const CUE_UPDATE = "cueUpdate";
export const CUE_SET_ACTIVE = "cueSetActive";

export const cueAdd = createAction(CUE_ADD, action => {
    return (
        audioBufferId: AudioBufferId,
        trackId: number,
        position: number,
        offset?: number,
        duration?: number,
    ) => action({ audioBufferId, trackId, position, offset, duration });
});

export const cueCopy = createAction(CUE_COPY, action => {
    return (cueId: CueId, position?: number, trackId?: number) => action({ cueId, position, trackId });
});

export const cueUpdate = createAction(CUE_UPDATE, action => {
    return (cueId: CueId, position?: number, offset?: number, duration?: number ) =>
        action({ cueId, position, offset, duration });
});

export const cueRemove = createAction(CUE_REMOVE, action => {
    return (cueId: CueId) => action({ cueId });
});

export const cueSetActive = createAction(CUE_SET_ACTIVE, action => {
    return (cueId: CueId) => action({ cueId });
});

export type CueAction =
    | ReturnType<typeof cueAdd>
    | ReturnType<typeof cueCopy>
    | ReturnType<typeof cueUpdate>
    | ReturnType<typeof cueRemove>
    | ReturnType<typeof cueSetActive>;