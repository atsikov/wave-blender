import { CuesState, Cue } from "./Cue";
import { State } from "../interface";

export function selectCuesState(state: State): CuesState {
    return state.cues;
}

export function selectCues(state: CuesState): Cue[] {
    return state.cues;
}

export function selectCuesForTrackId(state: CuesState, trackId: number): Cue[] {
    return selectCues(state).filter(cue => cue.trackId === trackId);
}

export function selectActiveCue(state: CuesState): number {
    return state.activeCue;
}
