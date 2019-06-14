import { CueId, AudioBufferId } from "../globalId";

export type CuesState = {
    cues: Cue[];
    activeCue: number;
}

export interface Cue {
    id: CueId;
    audioBufferId: AudioBufferId;
    trackId: number;
    trackPosition: number;
    offset: number;
    duration: number;
}

export const initialCuesState: CuesState = {
    cues: [],
    activeCue: -1,
}
