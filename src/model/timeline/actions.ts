import { createAction } from "typesafe-actions";

export const TRACK_ADD = "trackAdd";
export const TRACK_REMOVE = "trackRemove";
export const TRACK_UPDATE = "trackUpdate";
export const TRACK_SET_ACTIVE = "trackSetActive";

export const trackAdd = createAction(TRACK_ADD, action => {
    return ( trackId: number ) => action({ trackId });
});

export const trackRemove = createAction(TRACK_REMOVE, action => {
    return ( trackId: number ) => action({ trackId });
});

export const trackUpdate = createAction(TRACK_UPDATE, action => {
    return ( trackId: number, volume?: number, balance?: number ) =>
        action({ trackId, volume, balance });
});

export const trackSetActive = createAction(TRACK_SET_ACTIVE, action => {
    return ( trackId: number ) => action({ trackId });
});

export type TimelineAction =
    | ReturnType<typeof trackAdd>
    | ReturnType<typeof trackUpdate>
    | ReturnType<typeof trackRemove>
    | ReturnType<typeof trackSetActive>;
