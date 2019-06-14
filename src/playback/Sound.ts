import { Cue } from "../model/cue/Cue";
import { getAudioBuffer } from "./AudioBufferCache";

type DestinationNode =
    | GainNode
    | PannerNode
    | DelayNode
    | AudioDestinationNode;

export class Sound {
    private context: AudioContext;
    private sourceNode: AudioBufferSourceNode;
    private cue: Cue | undefined;

    constructor(context: AudioContext, cue: Cue, destination: DestinationNode) {
        this.context = context;
        this.cue = cue;

        this.sourceNode = context.createBufferSource();

        this.sourceNode.buffer = getAudioBuffer(cue.audioBufferId);
        this.sourceNode.connect(destination);
    }

    public play(currentContextTime: number) {
        if (!this.cue) {
            throw new Error("Attempt to play sound without assigned cue");
        }

        this.sourceNode.start(
            currentContextTime + this.cue.trackPosition / 1000,
            this.cue.offset / 1000,
            this.cue.duration / 1000,
        );

        console.log(`Sound ${this.cue.id} is starting at ${(currentContextTime + this.cue.trackPosition) / 1000}`);
    }

    public stop() {
        this.sourceNode.stop();
    }
}
