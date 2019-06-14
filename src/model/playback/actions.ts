import { createAction } from "typesafe-actions";

export const PLAYBACK_START = "playbackStart";
export const PLAYBACK_STOP = "playbackStop";

export const playbackStart = createAction(PLAYBACK_START, action => () => action());
export const playbackStop = createAction(PLAYBACK_STOP, action => () => action());

export type PlaybackAction =
    | ReturnType<typeof playbackStart>
    | ReturnType<typeof playbackStop>;
