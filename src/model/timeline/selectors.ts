import { Track, TimelineState } from "./Timeline";
import { State } from "../interface";

export function selectTimelineState(state: State): TimelineState {
    return state.timeline;
}

export function selectTracks(state: TimelineState): Track[] {
    return state.tracks;
}

export function selectTrackById(state: TimelineState, trackId: number): Track {
    return selectTracks(state)[trackId];
}

export function selectActiveTrack(state: TimelineState): number {
    return state.activeTrack;
}
