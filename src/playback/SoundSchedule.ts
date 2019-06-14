import { TimelineState, Track } from "../model/timeline/Timeline";
import { Sound } from "./Sound";
import { Cue, CuesState } from "../model/cue/Cue";

export class SoundSchedule {
    private schedule: Sound[] = [];

    private tracks: Track[] = [];
    private cues: Cue[] = [];

    public setTracksAndCues(tracks: Track[], cues: Cue[]) {
        this.tracks = tracks;
        this.cues = cues;
    }

    public updateSchedule(context: AudioContext): SoundSchedule {
        this.schedule.forEach(sound => sound.stop());
        this.schedule = this.cues.map(cue => new Sound(context, cue, context.destination));

        return this;
    }

    public play(currentTime: number) {
        this.schedule.forEach(sound => sound.play(currentTime));
    }
}
