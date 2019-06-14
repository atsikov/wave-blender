import { PlaybackState } from "./Playback";
import { State } from "../interface";

export function selectPlaybackState(state: State): PlaybackState {
    return state.playback;
}

export function selectIsPlaying(state: PlaybackState): boolean {
    return state.isPlaying;
}
