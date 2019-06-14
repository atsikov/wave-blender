import { SoundSchedule } from "./SoundSchedule";

export interface AudioPlaybackOptions {
    sampleRate?: number;
}

const DEFAULT_SAMLPE_RATE = 44100;

export class AudioPlayback {
    private context: AudioContext;
    private isSuspended = false;
    constructor(options?: AudioPlaybackOptions) {
        this.context = new AudioContext({
            latencyHint: "interactive",
            sampleRate: options && options.sampleRate || DEFAULT_SAMLPE_RATE,
        });
    }

    public resume() {
        if (this.isSuspended) {
            this.context.resume();
            this.isSuspended = false;
        }
    }

    public suspend() {
        if (!this.isSuspended) {
            this.context.suspend();
            this.isSuspended = true;
        }
    }

    public decodeAudioData(buffer: ArrayBuffer): Promise<AudioBuffer> {
        return new Promise((resolve, reject) => {
            this.context.decodeAudioData(buffer, resolve, reject);
        });
    }

    public playTimeline(schedule: SoundSchedule) {
        schedule
            .updateSchedule(this.context)
            .play(this.context.currentTime);
    }

    public playBuffer(buffer: AudioBuffer) {
        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.context.destination);
        source.start();
    }
}
