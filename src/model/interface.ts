import { TimelineState } from "./timeline/Timeline";
import { CuesState } from "./cue/Cue";
import { PlaybackState } from "./playback/Playback";
import { EditModeState } from "./editMode/EditMode";

export interface State {
    timeline: TimelineState;
    cues: CuesState;
    playback: PlaybackState;
    editMode: EditModeState,
}
