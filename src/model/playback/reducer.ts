import { PlaybackState, initialPlaybackState } from "./Playback";
import { PlaybackAction, PLAYBACK_START, PLAYBACK_STOP } from "./actions";

export function playbackReducer(state: PlaybackState = initialPlaybackState, action: PlaybackAction): PlaybackState {
    switch (action.type) {
        case PLAYBACK_START: {
            return {
                ...state,
                isPlaying: true,
            };
        }

        case PLAYBACK_STOP: {
            return {
                ...state,
                isPlaying: false,
            };
        }

        default:
            return state;
    }
}
