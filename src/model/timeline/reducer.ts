import { TimelineState, initialTimelineState, Track } from "./Timeline";
import { TimelineAction, TRACK_ADD, TRACK_REMOVE, TRACK_UPDATE, TRACK_SET_ACTIVE } from "./actions";
import { selectTrackById } from "./selectors";

export function timelineReducer(state: TimelineState = initialTimelineState, action: TimelineAction): TimelineState {
    switch (action.type) {
        case TRACK_ADD: {
            const { trackId } = action.payload;
            const track: Track = {
                balance: 0,
                volume: 1,
            };
            let tracks = state.tracks;
            if (trackId >= tracks.length) {
                tracks = [...tracks];
                tracks[trackId] = track;
            } else {
                tracks = tracks.slice(0, trackId).concat([track], tracks.slice(trackId));
            }
            return {
                ...state,
                tracks: tracks,
            };
        }

        case TRACK_UPDATE: {
            const { trackId, balance, volume } = action.payload;
            const track = selectTrackById(state, trackId);
            if (!track) {
                return state;
            }

            const copy = {
                ...track,
                balance: balance !== undefined ? balance : track.balance,
                volume: volume !== undefined ? volume : track.volume,
            }

            return {
                ...state,
                tracks: state.tracks.slice(0, trackId).concat([copy], state.tracks.slice(trackId + 1))
            };
        }

        case TRACK_REMOVE: {
            const { trackId } = action.payload;
            if (trackId < 0 || trackId >= state.tracks.length) {
                return state;
            }

            return {
                ...state,
                activeTrack: -1,
                tracks: state.tracks.slice(0, trackId).concat(state.tracks.slice(trackId + 1)),
            };
        }

        case TRACK_SET_ACTIVE: {
            const { trackId } = action.payload;
            return {
                ...state,
                activeTrack: trackId,
            };
        }
        default:
            return state;
    }
}
