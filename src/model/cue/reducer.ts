import { CuesState, initialCuesState, Cue } from "./Cue";
import { CueAction, CUE_ADD, CUE_COPY, CUE_UPDATE, CUE_REMOVE, CUE_SET_ACTIVE } from "./actions";
import { createCueId } from "../globalId";
import { getAudioBuffer } from "../../playback/AudioBufferCache";

export function cuesReducer(state: CuesState = initialCuesState, action: CueAction): CuesState {
    switch (action.type) {
        case CUE_ADD: {
            const { position, audioBufferId, trackId, offset, duration } = action.payload;
            const cueOffset = offset === undefined ? 0 : offset;
            const cueDuration = duration === undefined
                ? getAudioBuffer(audioBufferId).duration * 1000 - cueOffset
                : duration;
            const cue: Cue = {
                id: createCueId(),
                trackId: trackId,
                trackPosition: position,
                audioBufferId: audioBufferId,
                offset: cueOffset,
                duration: cueDuration,
            };
            return {
                ...state,
                cues: [...state.cues, cue],
            };
        }

        case CUE_COPY: {
            const { cueId, trackId, position } = action.payload;
            const cue = state.cues.find(candidate => candidate.id === cueId);
            if (!cue) {
                return state;
            }
            const copy = {
                ...cue,
                id: createCueId(),
                trackPosition: position === undefined ? cue.trackPosition : position,
                trackId: trackId === undefined ? cue.trackId : trackId,
            }
            return {
                ...state,
                cues: [...state.cues, copy],
            };
        }

        case CUE_UPDATE: {
            const { cueId, duration, offset, position } = action.payload;
            const cueIndex = state.cues.findIndex(candidate => candidate.id === cueId);
            const cue = state.cues[cueIndex];
            if (!cue) {
                return state;
            }
            const copy = {
                ...cue,
                duration: duration !== undefined ? duration : cue.duration,
                offset: offset !== undefined ? offset : cue.offset,
                trackPosition: position !== undefined ? position : cue.trackPosition,
            }
            return {
                ...state,
                cues: state.cues.slice(0, cueIndex).concat([copy], state.cues.slice(cueIndex + 1)),
            };
        }

        case CUE_REMOVE: {
            const cueIndex = state.cues.findIndex(candidate => candidate.id === action.payload.cueId);
            if (cueIndex === -1) {
                return state;
            }

            return {
                ...state,
                activeCue: -1,
                cues: state.cues.slice(0, cueIndex).concat(state.cues.slice(cueIndex + 1)),
            };
        }

        case CUE_SET_ACTIVE: {
            const { cueId } = action.payload;
            return {
                ...state,
                activeCue: cueId,
            };
        }
        default:
            return state;
    }
}
