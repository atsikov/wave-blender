import { AudioBufferId, createAudioBufferId } from "../model/globalId";

const audioBufferCache: {
    [id: number]: AudioBuffer;
} = {};

export function addAudioBuffer(audioBuffer: AudioBuffer): AudioBufferId {
    const id = createAudioBufferId();
    audioBufferCache[id] = audioBuffer;
    return id;
}

export function getAudioBuffer(id: AudioBufferId): AudioBuffer {
    return audioBufferCache[id];
}
